
export interface PaperResult {
  id: string;                  // internal id = provider:providerId
  provider: string;
  providerId: string;
  title: string;
  authors: { name: string; id?: string }[];
  year?: number;
  venue?: string;
  abstract?: string;
  url?: string;
  doi?: string;
  citedByCount?: number;
  publishedAt?: string;
  sourceTypes: string[];       // ["journal","preprint"]
  tags?: string[];             // inferred keywords
}

export interface AuthorResult {
  id: string;                  // provider:providerId
  provider: string;
  providerId: string;
  name: string;
  affiliation?: string;
  orcid?: string;
  worksCount?: number;
  citedByCount?: number;
  profileUrl?: string;
}

export interface SearchResponse {
  query: {
    q: string;
    type: string;
    limit: number;
    page: number;
    cursor?: string;
    providersUsed: string[];
  };
  papers: PaperResult[];
  authors: AuthorResult[];
  meta: {
    tookMs: number;
    partial: boolean;
    errors: { provider: string; message: string }[];
    nextCursor?: string;
  };
}

export interface SearchParams {
  q: string;
  type?: "papers" | "authors" | "all";
  limit?: number;
  page?: number;
  cursor?: string;
  yearFrom?: number;
  yearTo?: number;
  sort?: "relevance" | "recent";
  providers?: string[];
}
