
const RecentReports = () => {
  const recentReports = [
    {
      id: 1,
      title: 'Jalan Rusak di Jl. Sudirman',
      status: 'pending',
      date: '2025-12-01'
    },
    {
      id: 2,
      title: 'Lampu Jalan Mati',
      status: 'in-progress',
      date: '2025-11-30'
    },
    {
      id: 3,
      title: 'Sampah Menumpuk',
      status: 'completed',
      date: '2025-11-29'
    }
  ];

  return (
    <div className="recent-reports">
      <h3>Laporan Terbaru</h3>
      <div className="reports-list">
        {recentReports.map(report => (
          <div key={report.id} className="report-item">
            <div className="report-info">
              <h4>{report.title}</h4>
              <span className="report-date">{report.date}</span>
            </div>
            <span className={`report-status ${report.status}`}>
              {report.status}
            </span>
          </div>
        ))}
      </div>
      <a href="/riwayat-laporan" className="view-all-link">
        Lihat Semua Laporan
      </a>
    </div>
  );
};

export default RecentReports;