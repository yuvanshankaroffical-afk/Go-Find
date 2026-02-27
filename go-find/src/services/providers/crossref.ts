
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { env } from '../../config/env';
import { PaperResult, SearchParams } from '../../types/search';

const limiter = new Bottleneck({
  minTime: 200, // 5 requests per second
});

export const crossrefProvider = {
  name: 'crossref',

  async searchPapers(params: SearchParams): Promise<PaperResult[]> {
    const { q, limit = 10, page = 1 } = params;
    const offset = (page - 1) * limit;

    const response = await limiter.schedule(() => axios.get('https://api.crossref.org/works', {
      params: {
        query: q,
        rows: limit,
        offset,
      },
      headers: {
        'User-Agent': `ResearchPlatform/1.0 (mailto:${env.MAILTO})`,
      },
      timeout: 8000,
    }));

    return (response.data.message.items || []).map((item: any) => ({
      id: `crossref:${item.DOI}`,
      provider: 'crossref',
      providerId: item.DOI,
      title: item.title?.[0] || 'Untitled',
      authors: (item.author || []).map((a: any) => ({
        name: `${a.given || ''} ${a.family || ''}`.trim(),
        id: a.ORCID,
      })),
      year: item.issued?.['date-parts']?.[0]?.[0],
      venue: item['container-title']?.[0],
      abstract: item.abstract,
      url: item.URL,
      doi: item.DOI,
      citedByCount: item['is-referenced-by-count'] || 0,
      publishedAt: item.issued?.['date-parts']?.[0]?.join('-'),
      sourceTypes: [item.type],
      tags: item.subject || [],
    }));
  }
};
