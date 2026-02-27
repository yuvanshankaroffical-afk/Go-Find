
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  OPENALEX_API_KEY: z.string().optional(),
  SEMANTIC_SCHOLAR_API_KEY: z.string().optional(),
  ORCID_PUBLIC_TOKEN: z.string().optional(),
  REDIS_URL: z.string().optional(),
  PORT: z.string().default('3000'),
  CORS_ORIGIN: z.string().default('*'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MAILTO: z.string().email().default('research-platform@example.com'),
});

export const env = envSchema.parse(process.env);
