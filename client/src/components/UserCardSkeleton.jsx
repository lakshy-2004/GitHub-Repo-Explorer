import './UserCard.css';

export default function UserCardSkeleton() {
  return (
    <div className="skeleton-user">
      <div className="skeleton-avatar"></div>
      <div style={{ flex: 1 }}>
        <div className="skeleton-line wide"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line narrow"></div>
      </div>
    </div>
  );
}