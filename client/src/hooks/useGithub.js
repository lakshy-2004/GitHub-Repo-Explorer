import { useState } from 'react';
import { fetchUser, fetchRepos } from '../services/api.js';

export default function useGithub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [currentUsername, setCurrentUsername] = useState('');

  async function search(username) {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setPage(1);
    setCurrentUsername(username);

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

  return { user, repos, loading, error, hasMore, search, loadMore };
}