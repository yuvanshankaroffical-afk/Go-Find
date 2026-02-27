
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { AuthorResult, SearchParams } from '../../types/search';

const limiter = new Bottleneck({
  minTime: 200,
});

export const orcidProvider = {
  name: 'orcid',

  async searchAuthors(params: SearchParams): Promise<AuthorResult[]> {
    const { q, limit = 10, page = 1 } = params;
    const start = (page - 1) * limit;

    const response = await limiter.schedule(() => axios.get('https://pub.orcid.org/v3.0/expanded-search/', {
      params: {
        q,
        start,
        rows: limit,
      },
      headers: {
        'Accept': 'application/json',
      },
      timeout: 8000,
    }));

    return (response.data['expanded-result'] || []).map((author: any) => ({
      id: `orcid:${author['orcid-id']}`,
      provider: 'orcid',
      providerId: author['orcid-id'],
      name: `${author['given-names'] || ''} ${author['family-names'] || ''}`.trim(),
      affiliation: author['institution-name']?.[0],
      orcid: author['orcid-id'],
      worksCount: 0, // ORCID search doesn't return works count directly
      citedByCount: 0,
      profileUrl: `https://orcid.org/${author['orcid-id']}`,
    }));
  }
};
