
const ReportList = ({ reports, onReportClick }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: 'badge-warning', text: 'Pending' },
      'in-progress': { class: 'badge-info', text: 'Dalam Proses' },
      resolved: { class: 'badge-success', text: 'Selesai' },
      rejected: { class: 'badge-danger', text: 'Ditolak' }
    };
    
    const statusInfo = statusMap[status] || { class: 'badge-secondary', text: status };
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="report-list">
      {reports.length > 0 ? (
        reports.map((report) => (
          <div 
            key={report.id} 
            className="report-list-item"
            onClick={() => onReportClick(report.id)}
          >
            <div className="report-header">
              <h3 className="report-title">{report.title}</h3>
              {getStatusBadge(report.status)}
            </div>
            <div className="report-meta">
              <span className="report-id">ID: #{report.id}</span>
              <span className="report-category">{report.category}</span>
              <span className="report-date">{report.date}</span>
            </div>
            <div className="report-description">
              <p>{report.description}</p>
            </div>
            <div className="report-actions">
              <button className="btn-detail">Lihat Detail</button>
              {report.status === 'pending' && (
                <button className="btn-edit">Edit</button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="no-reports">
          <div className="no-reports-icon">📋</div>
          <h3>Belum Ada Laporan</h3>
          <p>Anda belum membuat laporan apapun.</p>
          <a href="/buat-laporan" className="btn-create">
            Buat Laporan Pertama
          </a>
        </div>
      )}
    </div>
  );
};

export default ReportList;