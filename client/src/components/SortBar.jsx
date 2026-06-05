export default function SortBar({ sortBy, onSort }) {
  return (
    <div className="sort-bar">
      <span>Sort by:</span>
      {['stars', 'name', 'updated'].map(option => (
        <button
          key={option}
          onClick={() => onSort(option)}
          className={`sort-button ${sortBy === option ? 'active' : ''}`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}