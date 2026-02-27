
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { env } from '../../config/env';
import { PaperResult, AuthorResult, SearchParams } from '../../types/search';

const limiter = new Bottleneck({
  minTime: 100, // 10 requests per second
});

export const openalexProvider = {
  name: 'openalex',

  async searchPapers(params: SearchParams): Promise<{ results: PaperResult[], nextCursor?: string }> {
    const { q, limit = 10, cursor = '*' } = params;
    
    const response = await limiter.schedule(() => axios.get('https://api.openalex.org/works', {
      params: {
        search: q,
        'per-page': limit,
        cursor,
        mailto: env.MAILTO,
      },
      headers: env.OPENALEX_API_KEY ? { 'Authorization': `Bearer ${env.OPENALEX_API_KEY}` } : {},
      timeout: 8000,
    }));

    const results: PaperResult[] = response.data.results.map((work: any) => ({
      id: `openalex:${work.id.split('/').pop()}`,
      provider: 'openalex',
      providerId: work.id.split('/').pop(),
      title: work.title,
      authors: work.authorships.map((a: any) => ({
        name: a.author.display_name,
        id: a.author.id.split('/').pop(),
      })),
      year: work.publication_year,
      venue: work.primary_location?.source?.display_name,
      abstract: '', // OpenAlex abstract is inverted index, complex to parse simply
      url: work.doi || work.primary_location?.landing_page_url,
      doi: work.doi?.replace('https://doi.org/', ''),
      citedByCount: work.cited_by_count,
      publishedAt: work.publication_date,
      sourceTypes: [work.type],
      tags: work.concepts?.map((c: any) => c.display_name) || [],
    }));

    return {
      results,
      nextCursor: response.data.meta.next_cursor,
    };
  },

  async searchAuthors(params: SearchParams): Promise<AuthorResult[]> {
    const { q, limit = 10 } = params;
    
    const response = await limiter.schedule(() => axios.get('https://api.openalex.org/authors', {
      params: {
        search: q,
        'per-page': limit,
        mailto: env.MAILTO,
      },
      headers: env.OPENALEX_API_KEY ? { 'Authorization': `Bearer ${env.OPENALEX_API_KEY}` } : {},
      timeout: 8000,
    }));

    return response.data.results.map((author: any) => ({
      id: `openalex:${author.id.split('/').pop()}`,
      provider: 'openalex',
      providerId: author.id.split('/').pop(),
      name: author.display_name,
      affiliation: author.last_known_institution?.display_name,
      orcid: author.orcid?.split('/').pop(),
      worksCount: author.works_count,
      citedByCount: author.cited_by_count,
      profileUrl: author.id,
    }));
  }
};
