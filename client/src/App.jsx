import { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar.jsx';
import RepoCard from './components/RepoCard.jsx';
import SortBar from './components/SortBar.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import UserCardSkeleton from './components/UserCardSkeleton.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import LanguageChart from './components/LanguageChart.jsx';
import useGithub from './hooks/useGithub.js';
import './index.css';

export default function App() {
  const { user, repos, loading, error, hasMore, search, loadMore, recentSearches } = useGithub();
  const [sortBy, setSortBy] = useState('stars');

  const sortedRepos = useMemo(() => {
    const copy = [...repos];
    if (sortBy === 'stars') return copy.sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (sortBy === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'updated') return copy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return copy;
  }, [repos, sortBy]);

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Repo Explorer</h1>
        <p>Search any GitHub user to explore their profile and repositories</p>
      </header>

      <main className="main">
        <SearchBar onSearch={search} loading={loading} />
        <RecentSearches searches={recentSearches} onSelect={search} />

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {!user && !loading && !error && (
          <div className="empty-state">
            <p>Enter a GitHub username to get started</p>
          </div>
        )}

        {loading && (
          <>
            <UserCardSkeleton />
            <div className="repos-list">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {!loading && user && (
          <div className="user-card">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <div className="user-info">
              <h2>{user.name || user.login}</h2>
              {user.bio && <p>{user.bio}</p>}
              {user.location && <p>📍 {user.location}</p>}
              <div className="user-stats">
                <span>Followers: {user.followers}</span>
                <span>Following: {user.following}</span>
                <span>Repos: {user.public_repos}</span>
              </div>
              <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
          </div>
        )}

        {!loading && repos.length > 0 && (
          <LanguageChart repos={repos} />
        )}

        {!loading && sortedRepos.length > 0 && (
          <div className="repos-section">
            <SortBar sortBy={sortBy} onSort={setSortBy} />
            <div className="repos-list">
              {sortedRepos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {hasMore && (
              <button onClick={loadMore} className="load-more">
                Load More
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}