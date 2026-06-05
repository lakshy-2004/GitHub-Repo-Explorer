import { useState } from 'react';

export default function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="repo-card">
      <div className="repo-card-header">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
        <button
          className="expand-button"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? '▲ Less' : '▼ More'}
        </button>
      </div>

      {repo.description && <p>{repo.description}</p>}

      <div className="repo-meta">
        {repo.language && <span>🔵 {repo.language}</span>}
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      {expanded && (
        <div className="repo-details">
          <span>🐛 Open Issues: {repo.open_issues_count}</span>
          <span>🌿 Default Branch: {repo.default_branch}</span>
        </div>
      )}
    </div>
  );
}