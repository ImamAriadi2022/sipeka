
const AdminHeader = ({ title }) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <h1>{title}</h1>
        <div className="admin-actions">
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">5</span>
          </button>
          <div className="admin-info">
            <span className="admin-name">Admin User</span>
            <span className="admin-role">Administrator</span>
            <img src="/admin-avatar.png" alt="Admin" className="admin-avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;