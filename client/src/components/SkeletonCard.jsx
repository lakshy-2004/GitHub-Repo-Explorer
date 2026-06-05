import './UserCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '1rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div className="skeleton-line wide"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line narrow"></div>
    </div>
  );
}