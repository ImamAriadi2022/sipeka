const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Buat Laporan', path: '/buat-laporan', icon: '📝' },
    { label: 'Riwayat', path: '/riwayat-laporan', icon: '📋' },
    { label: 'Profil', path: '/profil', icon: '👤' },
    { label: 'Logout', path: '/logout', icon: '🚪' }
  ];

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const navigate = (path) => {
    if (path === '/logout') {
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('currentUser');
      } catch {}
      window.history.pushState({}, '', '/login');
      window.location.reload();
      return;
    }
    window.history.pushState({}, '', path);
    window.location.reload();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/img/logo-unila.png" alt="Logo" className="sidebar-logo" />
        <div className="sidebar-title">SIPEKA</div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => {
            const active = item.path !== '/logout' && currentPath === item.path;
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`sidebar-link ${active ? 'active' : ''}`}
                >
                  <span className="icon" aria-hidden>{item.icon}</span>
                  <span className="label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;