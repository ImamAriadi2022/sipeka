
const AdminHeader = ({ title }) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-title">
          <h1>{title}</h1>
          <p className="header-subtitle">
            Monitor dan analisis seluruh aktivitas admin dalam sistem
          </p>
        </div>
        <div className="admin-actions">
          <button className="refresh-btn" title="Refresh Data">
            <span className="refresh-icon">🔄</span>
            <span>Refresh</span>
          </button>
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">2</span>
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