
import { Request, Response } from 'express';
import { z } from 'zod';
import { openalexProvider } from '../services/providers/openalex';
import { semanticScholarProvider } from '../services/providers/semanticscholar';
import { arxivProvider } from '../services/providers/arxiv';
import { crossrefProvider } from '../services/providers/crossref';
import { orcidProvider } from '../services/providers/orcid';
import { deduplicatePapers, deduplicateAuthors, rankPapers } from '../services/normalize';
import { searchCache } from '../services/cache';
import { SearchParams, PaperResult, AuthorResult } from '../types/search';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

const searchSchema = z.object({
  q: z.string().min(2),
  type: z.enum(['papers', 'authors', 'all']).default('all'),
  limit: z.coerce.number().min(1).max(25).default(10),
  page: z.coerce.number().min(1).default(1),
  cursor: z.string().optional(),
  yearFrom: z.coerce.number().optional(),
  yearTo: z.coerce.number().optional(),
  sort: z.enum(['relevance', 'recent']).default('relevance'),
  providers: z.string().optional().transform(v => v ? v.split(',') : undefined),
});

export const searchController = {
  async unifiedSearch(req: Request, res: Response) {
    const start = Date.now();
    const validation = searchSchema.safeParse(req.query);
    
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const params = validation.data as SearchParams;
    const cacheKey = JSON.stringify(params);
    
    if (searchCache.has(cacheKey)) {
      return res.json(searchCache.get(cacheKey));
    }

    const providersUsed: string[] = [];
    const errors: { provider: string, message: string }[] = [];
    let papers: PaperResult[] = [];
    let authors: AuthorResult[] = [];
    let nextCursor: string | undefined;

    const promises: Promise<void>[] = [];

    // Paper Search
    if (params.type === 'papers' || params.type === 'all') {
      const paperProviders = [
        openalexProvider,
        semanticScholarProvider,
        arxivProvider,
        crossrefProvider
      ].filter(p => !params.providers || params.providers.includes(p.name));

      paperProviders.forEach(provider => {
        promises.push(
          (async () => {
            try {
              providersUsed.push(provider.name);
              const res = await provider.searchPapers(params);
              if (Array.isArray(res)) {
                papers = [...papers, ...res];
              } else {
                papers = [...papers, ...res.results];
                if (provider.name === 'openalex') nextCursor = res.nextCursor;
              }
            } catch (err: any) {
              logger.error({ err, provider: provider.name }, 'Provider search failed');
              errors.push({ provider: provider.name, message: err.message });
            }
          })()
        );
      });
    }

    // Author Search
    if (params.type === 'authors' || params.type === 'all') {
      const authorProviders = [
        openalexProvider,
        orcidProvider,
        semanticScholarProvider
      ].filter(p => !params.providers || params.providers.includes(p.name));

      authorProviders.forEach(provider => {
        promises.push(
          (async () => {
            try {
              providersUsed.push(provider.name);
              const res = await provider.searchAuthors(params);
              authors = [...authors, ...res];
            } catch (err: any) {
              logger.error({ err, provider: provider.name }, 'Provider search failed');
              errors.push({ provider: provider.name, message: err.message });
            }
          })()
        );
      });
    }

    await Promise.all(promises);

    const dedupedPapers = deduplicatePapers(papers);
    const rankedPapers = rankPapers(dedupedPapers, params.sort);
    const dedupedAuthors = deduplicateAuthors(authors);

    const response = {
      query: { ...params, providersUsed: Array.from(new Set(providersUsed)) },
      papers: rankedPapers,
      authors: dedupedAuthors,
      meta: {
        tookMs: Date.now() - start,
        partial: errors.length > 0,
        errors,
        nextCursor
      }
    };

    searchCache.set(cacheKey, response);
    res.json(response);
  }
};
