
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import Bottleneck from 'bottleneck';
import { PaperResult, SearchParams } from '../../types/search';

const limiter = new Bottleneck({
  minTime: 3000, // arXiv is strict, 3 seconds between requests
});

export const arxivProvider = {
  name: 'arxiv',

  async searchPapers(params: SearchParams): Promise<PaperResult[]> {
    const { q, limit = 10, page = 1 } = params;
    const start = (page - 1) * limit;

    const response = await limiter.schedule(() => axios.get('http://export.arxiv.org/api/query', {
      params: {
        search_query: `all:${q}`,
        start,
        max_results: limit,
      },
      timeout: 10000,
    }));

    const parsed = await parseStringPromise(response.data);
    const entries = parsed.feed.entry || [];

    return entries.map((entry: any) => {
      const id = entry.id[0].split('/abs/').pop();
      return {
        id: `arxiv:${id}`,
        provider: 'arxiv',
        providerId: id,
        title: entry.title[0].trim().replace(/\n/g, ' '),
        authors: entry.author.map((a: any) => ({
          name: a.name[0],
        })),
        year: new Date(entry.published[0]).getFullYear(),
        venue: 'arXiv',
        abstract: entry.summary[0].trim().replace(/\n/g, ' '),
        url: entry.id[0],
        doi: entry['arxiv:doi'] ? entry['arxiv:doi'][0]._ : undefined,
        citedByCount: 0,
        publishedAt: entry.published[0],
        sourceTypes: ['preprint'],
        tags: entry.category.map((c: any) => c.$.term),
      };
    });
  }
};
