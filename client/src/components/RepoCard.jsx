import { useState } from 'react';
import './RepoCard.css';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Dart: '#00B4AB',
};

export default function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false);

  if (!repo) return null;

  const langColor = LANG_COLORS[repo.language] || '#8b949e';

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
        {repo.language && (
          <span>
            <span className="lang-dot" style={{ background: langColor }}></span>
            {repo.language}
          </span>
        )}
        <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
        <span>🍴 {repo.forks_count.toLocaleString()}</span>
        <span>🕒 {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      {expanded && (
        <div className="repo-details">
          <span>🐛 {repo.open_issues_count} open issues</span>
          <span>🌿 {repo.default_branch}</span>
        </div>
      )}
    </div>
  );
}