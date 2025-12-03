
const ReportsOverview = () => {
  const reportsData = [
    { category: 'Infrastruktur', count: 45, status: 'high' },
    { category: 'Kebersihan', count: 32, status: 'medium' },
    { category: 'Keamanan', count: 18, status: 'low' },
    { category: 'Pelayanan Publik', count: 27, status: 'medium' },
    { category: 'Lingkungan', count: 15, status: 'low' }
  ];

  return (
    <div className="reports-overview">
      <div className="widget-header">
        <h3>Ringkasan Laporan per Kategori</h3>
        <button className="view-details-btn">Lihat Detail</button>
      </div>
      
      <div className="reports-list">
        {reportsData.map((report, index) => (
          <div key={index} className="report-category-item">
            <div className="category-info">
              <h4>{report.category}</h4>
              <span className="category-count">{report.count} laporan</span>
            </div>
            <div className={`category-status ${report.status}`}>
              <span className="status-indicator"></span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-placeholder">
        <p>📊 Grafik akan ditampilkan di sini</p>
      </div>
    </div>
  );
};

export default ReportsOverview;