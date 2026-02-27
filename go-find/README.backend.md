
# Search Service Backend

Unified search backend for papers and researchers.

## Features
- Unified search across OpenAlex, Semantic Scholar, arXiv, Crossref, and ORCID.
- Normalization and deduplication of results.
- In-memory caching (LRU).
- Rate limiting and provider-specific throttling.
- Full-stack integration with Vite/React.

## Setup
1. Copy `.env.example` to `.env`.
2. Add your API keys for OpenAlex and Semantic Scholar.
3. Run `npm install`.
4. Run `npm run dev`.

## API Endpoints
- `GET /api/v1/search?q=...`: Unified search.
- `GET /api/v1/search/papers?q=...`: Paper search.
- `GET /api/v1/search/authors?q=...`: Author search.
- `GET /api/health`: Health check.
