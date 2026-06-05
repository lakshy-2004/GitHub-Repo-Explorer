import { useState } from 'react';
import { fetchUser, fetchRepos } from '../services/api.js';

const MAX_RECENT = 5;

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem('recentSearches')) || [];
  } catch {
    return [];
  }
}

function saveRecent(username, current) {
  const updated = [username, ...current.filter(u => u !== username)].slice(0, MAX_RECENT);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
  return updated;
}

export default function useGithub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [currentUsername, setCurrentUsername] = useState('');
  const [recentSearches, setRecentSearches] = useState(loadRecent);

  async function search(username) {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setPage(1);
    setCurrentUsername(username);

    const updated = saveRecent(username, recentSearches);
    setRecentSearches(updated);

    try {
      const [userData, repoData] = await Promise.all([
        fetchUser(username),
        fetchRepos(username, 1),
      ]);

      setUser(userData);
      setRepos(repoData.repos);
      setHasMore(repoData.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const repoData = await fetchRepos(currentUsername, nextPage);
      setRepos(prev => [...prev, ...repoData.repos]);
      setHasMore(repoData.hasMore);
    } catch (err) {
      setError(err.message);
    }
  }

  return { user, repos, loading, error, hasMore, search, loadMore, recentSearches };
}