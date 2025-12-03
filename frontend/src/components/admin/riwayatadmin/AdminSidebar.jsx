
const AdminSidebar = () => {
  const menuItems = [
    { label: 'Dashboard Admin', path: '/admin/dashboard', icon: '🏠' },
    { label: 'Kelola Laporan', path: '/admin/laporan', icon: '📋' },
    { label: 'Validasi Pimpinan', path: '/admin/validasi-pimpinan', icon: '✅' },
    { label: 'Riwayat Aktivitas', path: '/admin/riwayat', icon: '📊', active: true },
    { label: 'Manajemen User', path: '/admin/users', icon: '👥' },
    { label: 'Pengaturan', path: '/admin/settings', icon: '⚙️' },
    { label: 'Logout', path: '/logout', icon: '🚪' }
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Sipeka Admin</h2>
        <span className="admin-badge">Administrator</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.path} 
                className={`sidebar-link ${item.active ? 'active' : ''}`}
              >
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

export default AdminSidebar;