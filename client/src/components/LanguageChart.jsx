import './LanguageChart.css';

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

export default function LanguageChart({ repos }) {
  const counts = repos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  if (data.length === 0) return null;

  const max = data[0].value;

  return (
    <div className="language-chart">
      <h3>Languages</h3>
      {data.map(({ name, value }) => (
        <div key={name} className="lang-row">
          <span className="lang-name">{name}</span>
          <div className="lang-bar-bg">
            <div
              className="lang-bar"
              style={{
                width: `${(value / max) * 100}%`,
                background: LANG_COLORS[name] || '#8b949e',
              }}
            />
          </div>
          <span className="lang-count">{value}</span>
        </div>
      ))}
    </div>
  );
}