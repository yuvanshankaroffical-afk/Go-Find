
import { PaperResult, AuthorResult } from '../types/search';

export function deduplicatePapers(papers: PaperResult[]): PaperResult[] {
  const seen = new Map<string, PaperResult>();

  for (const paper of papers) {
    // Try to match by DOI first
    const doi = paper.doi?.toLowerCase();
    const title = paper.title.toLowerCase().trim();
    
    const key = doi || title;
    
    if (!seen.has(key)) {
      seen.set(key, paper);
    } else {
      const existing = seen.get(key)!;
      // Enrich existing with more data if possible
      if (!existing.abstract && paper.abstract) existing.abstract = paper.abstract;
      if (!existing.citedByCount && paper.citedByCount) existing.citedByCount = paper.citedByCount;
      if (paper.provider === 'semanticscholar' || paper.provider === 'openalex') {
          // Prefer these providers for metadata
          seen.set(key, { ...paper, ...existing, provider: paper.provider, providerId: paper.providerId });
      }
    }
  }

  return Array.from(seen.values());
}

export function deduplicateAuthors(authors: AuthorResult[]): AuthorResult[] {
  const seen = new Map<string, AuthorResult>();

  for (const author of authors) {
    const orcid = author.orcid?.toLowerCase();
    const name = author.name.toLowerCase().trim();
    const key = orcid || name;

    if (!seen.has(key)) {
      seen.set(key, author);
    } else {
      const existing = seen.get(key)!;
      if (!existing.affiliation && author.affiliation) existing.affiliation = author.affiliation;
      if (author.worksCount && author.worksCount > (existing.worksCount || 0)) {
        existing.worksCount = author.worksCount;
      }
    }
  }

  return Array.from(seen.values());
}

export function rankPapers(papers: PaperResult[], sort?: 'relevance' | 'recent'): PaperResult[] {
  if (sort === 'recent') {
    return papers.sort((a, b) => (b.year || 0) - (a.year || 0));
  }
  
  // Default: Rank by citations and provider priority
  return papers.sort((a, b) => {
    const priority: Record<string, number> = { openalex: 10, semanticscholar: 9, crossref: 8, arxiv: 7 };
    const aScore = (priority[a.provider] || 0) * 1000 + (a.citedByCount || 0);
    const bScore = (priority[b.provider] || 0) * 1000 + (b.citedByCount || 0);
    return bScore - aScore;
  });
}
