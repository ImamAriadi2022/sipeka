
const QuickActions = () => {
  const actions = [
    {
      title: 'Buat Laporan Baru',
      description: 'Laporkan keluhan atau masalah baru',
      icon: '📝',
      path: '/buat-laporan',
      color: 'primary'
    },
    {
      title: 'Lihat Riwayat',
      description: 'Cek status laporan sebelumnya',
      icon: '📋',
      path: '/riwayat-laporan',
      color: 'secondary'
    },
    {
      title: 'Update Profil',
      description: 'Perbarui informasi profil Anda',
      icon: '👤',
      path: '/profil',
      color: 'tertiary'
    }
  ];

  return (
    <div className="quick-actions">
      <h3>Aksi Cepat</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <a key={index} href={action.path} className={`action-card ${action.color}`}>
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;