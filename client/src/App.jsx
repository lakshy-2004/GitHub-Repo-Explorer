import { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar.jsx';
import RepoCard from './components/RepoCard.jsx';
import SortBar from './components/SortBar.jsx';
import UserCard from './components/UserCard.jsx';
import UserCardSkeleton from './components/UserCardSkeleton.jsx';
import SkeletonCard from './components/SkeletonCard.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import LanguageChart from './components/LanguageChart.jsx';
import useGithub from './hooks/useGithub.js';
import './index.css';
import './App.css';

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
        <h1>⚡ GitHub Repo Explorer</h1>
        <p>Search any GitHub user to explore their profile and repositories</p>
      </header>

      <main>
        <div className="search-wrap">
          <SearchBar onSearch={search} loading={loading} />
          <RecentSearches searches={recentSearches} onSelect={search} />
        </div>

        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        {!user && !loading && !error && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Enter a GitHub username to get started</p>
          </div>
        )}

        {loading && (
          <>
            <UserCardSkeleton />
            <div className="repos-list" style={{ marginTop: '1rem' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {!loading && user && <UserCard user={user} />}

        {!loading && repos.length > 0 && (
          <LanguageChart repos={repos} />
        )}

        {!loading && sortedRepos.length > 0 && (
          <div className="repos-section">
            <div className="repos-toolbar">
              <span className="repos-count">{sortedRepos.length} repositories</span>
              <SortBar sortBy={sortBy} onSort={setSortBy} />
            </div>
            <div className="repos-list">
              {sortedRepos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
            {hasMore && (
              <button onClick={loadMore} className="load-more">
                Load more repositories
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}