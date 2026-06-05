const cache = {};
const CACHE_TTL = 60 * 1000;

export function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;
  if (isExpired) {
    delete cache[key];
    return null;
  }

  return entry.data;
}

export function setCache(key, data) {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}