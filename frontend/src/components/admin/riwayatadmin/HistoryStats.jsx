
const HistoryStats = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Aktivitas',
      value: stats.totalActions,
      icon: '📊',
      color: 'primary',
      description: 'Total aktivitas admin hari ini'
    },
    {
      title: 'Laporan Diproses',
      value: stats.reportsProcessed,
      icon: '📋',
      color: 'success',
      description: 'Laporan yang diproses hari ini'
    },
    {
      title: 'Waktu Resp. Rata-rata',
      value: `${stats.averageResponseTime}h`,
      icon: '⏱️',
      color: 'info',
      description: 'Rata-rata waktu respon admin'
    },
    {
      title: 'Admin Aktif',
      value: '3',
      icon: '👥',
      color: 'warning',
      description: 'Jumlah admin yang aktif hari ini'
    }
  ];

  return (
    <div className="history-stats">
      <h3>Statistik Aktivitas Admin</h3>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h4 className="stat-value">{stat.value}</h4>
              <p className="stat-title">{stat.title}</p>
              <small className="stat-description">{stat.description}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryStats;