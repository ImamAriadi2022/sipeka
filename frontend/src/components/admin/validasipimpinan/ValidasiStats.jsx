
const ValidasiStats = ({ stats }) => {
  const statsData = [
    {
      title: 'Menunggu Validasi',
      value: stats.menungguValidasi,
      icon: '⏳',
      color: 'warning',
      description: 'Laporan yang menunggu validasi pimpinan'
    },
    {
      title: 'Disetujui',
      value: stats.disetujui,
      icon: '✅',
      color: 'success',
      description: 'Laporan yang telah disetujui pimpinan'
    },
    {
      title: 'Ditolak',
      value: stats.ditolak,
      icon: '❌',
      color: 'danger',
      description: 'Laporan yang ditolak pimpinan'
    },
    {
      title: 'Total Laporan',
      value: stats.total,
      icon: '📊',
      color: 'info',
      description: 'Total seluruh laporan validasi'
    }
  ];

  return (
    <div className="validasi-stats">
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <small className="stat-description">{stat.description}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidasiStats;