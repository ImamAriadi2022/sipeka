
const AdminHeader = ({ title }) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-title">
          <h1>{title}</h1>
          <p className="header-subtitle">
            Kelola validasi laporan dari pimpinan secara manual/offline
          </p>
        </div>
        <div className="admin-actions">
          <div className="help-info">
            <span className="help-icon">ℹ️</span>
            <span className="help-text">
              Admin mencatat hasil validasi pimpinan yang dilakukan secara offline
            </span>
          </div>
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
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