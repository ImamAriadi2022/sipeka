
const Header = ({ title }) => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>{title}</h1>
        <div className="header-actions">
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <img src="/default-avatar.png" alt="User" className="user-avatar" />
          </div>
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;