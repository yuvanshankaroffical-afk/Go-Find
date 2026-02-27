
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { env } from '../../config/env';
import { PaperResult, AuthorResult, SearchParams } from '../../types/search';

const limiter = new Bottleneck({
  minTime: 1000, // 1 request per second for free tier
});

export const semanticScholarProvider = {
  name: 'semanticscholar',

  async searchPapers(params: SearchParams): Promise<PaperResult[]> {
    const { q, limit = 10, page = 1 } = params;
    const offset = (page - 1) * limit;

    const response = await limiter.schedule(() => axios.get('https://api.semanticscholar.org/graph/v1/paper/search', {
      params: {
        query: q,
        limit,
        offset,
        fields: 'title,authors,year,venue,url,abstract,citationCount,externalIds,publicationDate,publicationTypes',
      },
      headers: env.SEMANTIC_SCHOLAR_API_KEY ? { 'x-api-key': env.SEMANTIC_SCHOLAR_API_KEY } : {},
      timeout: 8000,
    }));

    return (response.data.data || []).map((paper: any) => ({
      id: `semanticscholar:${paper.paperId}`,
      provider: 'semanticscholar',
      providerId: paper.paperId,
      title: paper.title,
      authors: paper.authors.map((a: any) => ({
        name: a.name,
        id: a.authorId,
      })),
      year: paper.year,
      venue: paper.venue,
      abstract: paper.abstract,
      url: paper.url,
      doi: paper.externalIds?.DOI,
      citedByCount: paper.citationCount,
      publishedAt: paper.publicationDate,
      sourceTypes: paper.publicationTypes || [],
      tags: [],
    }));
  },

  async searchAuthors(params: SearchParams): Promise<AuthorResult[]> {
    const { q, limit = 10 } = params;
    
    const response = await limiter.schedule(() => axios.get('https://api.semanticscholar.org/graph/v1/author/search', {
      params: {
        query: q,
        limit,
        fields: 'name,affiliations,homepage,paperCount,citationCount,externalIds',
      },
      headers: env.SEMANTIC_SCHOLAR_API_KEY ? { 'x-api-key': env.SEMANTIC_SCHOLAR_API_KEY } : {},
      timeout: 8000,
    }));

    return (response.data.data || []).map((author: any) => ({
      id: `semanticscholar:${author.authorId}`,
      provider: 'semanticscholar',
      providerId: author.authorId,
      name: author.name,
      affiliation: author.affiliations?.[0],
      orcid: author.externalIds?.ORCID,
      worksCount: author.paperCount,
      citedByCount: author.citationCount,
      profileUrl: author.url || author.homepage,
    }));
  }
};
