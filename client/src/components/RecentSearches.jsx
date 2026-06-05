export default function RecentSearches({ searches, onSelect }) {
  if (searches.length === 0) return null;

  return (
    <div className="recent-searches">
      <span>Recent:</span>
      {searches.map(username => (
        <button
          key={username}
          className="recent-chip"
          onClick={() => onSelect(username)}
        >
          {username}
        </button>
      ))}
    </div>
  );
}