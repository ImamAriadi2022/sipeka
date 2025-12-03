
const ReportCard = ({ report, onClick }) => {
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
    <div className="report-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-id">#{report.id}</div>
        {getStatusBadge(report.status)}
      </div>
      
      <div className="card-body">
        <h3 className="card-title">{report.title}</h3>
        <p className="card-description">{report.description}</p>
        
        <div className="card-meta">
          <div className="meta-item">
            <span className="meta-label">Kategori:</span>
            <span className="meta-value">{report.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Tanggal:</span>
            <span className="meta-value">{report.date}</span>
          </div>
          {report.location && (
            <div className="meta-item">
              <span className="meta-label">Lokasi:</span>
              <span className="meta-value">📍 {report.location}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-footer">
        <button className="btn-view">Lihat Detail</button>
        {report.status === 'pending' && (
          <button className="btn-edit">Edit</button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;