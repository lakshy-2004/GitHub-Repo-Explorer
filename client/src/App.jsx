import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import useGithub from './hooks/useGithub.js';
import './index.css';

export default function App() {
  const { user, repos, loading, error, hasMore, search, loadMore } = useGithub();

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Repo Explorer</h1>
        <p>Search any GitHub user to explore their profile and repositories</p>
      </header>

      <main className="main">
        <SearchBar onSearch={search} loading={loading} />

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

        {user && (
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

        {repos.length > 0 && (
          <div className="repos-section">
            <h3>{repos.length} Repositories</h3>
            <div className="repos-list">
              {repos.map(repo => (
                <div key={repo.id} className="repo-card">
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                  {repo.description && <p>{repo.description}</p>}
                  <div className="repo-meta">
                    {repo.language && <span>🔵 {repo.language}</span>}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
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