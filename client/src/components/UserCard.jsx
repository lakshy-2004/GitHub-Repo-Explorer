import './UserCard.css';

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-card-banner"></div>
      <div className="user-card-body">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <h2 className="user-name">{user.name || user.login}</h2>
        <p className="user-login">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        {user.location && (
          <p className="user-location">📍 {user.location}</p>
        )}
        <div className="user-stats-grid">
          <div className="stat-box">
            <strong>{user.followers.toLocaleString()}</strong>
            <span>Followers</span>
          </div>
          <div className="stat-box">
            <strong>{user.following.toLocaleString()}</strong>
            <span>Following</span>
          </div>
          <div className="stat-box">
            <strong>{user.public_repos}</strong>
            <span>Repos</span>
          </div>
        </div>
        <a href={user.html_url} target="_blank" rel="noreferrer" className="user-link">
          View on GitHub ↗
        </a>
      </div>
    </div>
  );
}