import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/admin/dashboard' },
    { id: 'kelola-laporan', label: 'Kelola Laporan', icon: '📋', path: '/admin/kelola-laporan', active: true },
    { id: 'validasi-pimpinan', label: 'Validasi Pimpinan', icon: '✅', path: '/admin/validasi-pimpinan' },
    { id: 'riwayat-admin', label: 'Riwayat Admin', icon: '📊', path: '/admin/riwayat-admin' },
    { id: 'pengaturan', label: 'Pengaturan', icon: '⚙️', path: '/admin/pengaturan' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      // Clear session/token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          {!isCollapsed && <span className="logo-text">SIPEKA Admin</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className={`nav-item ${item.active ? 'active' : ''}`}>
              <button 
                onClick={() => handleMenuClick(item.path)}
                className="nav-link"
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          {!isCollapsed && (
            <div className="user-details">
              <span className="user-name">Admin User</span>
              <span className="user-role">Administrator</span>
            </div>
          )}
        </div>
        <button 
          onClick={handleLogout}
          className="logout-btn"
          title="Logout"
        >
          🚪 {!isCollapsed && 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;