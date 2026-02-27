
import { LRUCache } from 'lru-cache';

const options = {
  max: 500,
  // how long to live in ms
  ttl: 1000 * 60 * 30, // 30 minutes
};

const cache = new LRUCache<string, any>(options);

export const searchCache = {
  get: (key: string) => cache.get(key),
  set: (key: string, value: any) => cache.set(key, value),
  has: (key: string) => cache.has(key),
};
