export default function UserCardSkeleton() {
  return (
    <div className="user-card skeleton-user">
      <div className="skeleton-avatar"></div>
      <div className="user-info" style={{ flex: 1 }}>
        <div className="skeleton-line wide"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line narrow"></div>
      </div>
    </div>
  );
}