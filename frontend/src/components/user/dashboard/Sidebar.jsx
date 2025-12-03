
const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Buat Laporan', path: '/buat-laporan', icon: '📝' },
    { label: 'Riwayat Laporan', path: '/riwayat-laporan', icon: '📋' },
    { label: 'Profil', path: '/profil', icon: '👤' },
    { label: 'Logout', path: '/logout', icon: '🚪' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sipeka</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.path} className="sidebar-link">
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;