
const ReportTable = ({ reports, onStatusChange }) => {
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

  const handleStatusChange = (reportId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(reportId, newStatus);
    }
  };

  return (
    <div className="report-table">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Pelapor</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id}>
                <td>#{report.id}</td>
                <td className="report-title">
                  <a href={`/admin/laporan/detail/${report.id}`}>
                    {report.title}
                  </a>
                </td>
                <td>{report.category}</td>
                <td>{report.reporter}</td>
                <td>{report.date}</td>
                <td>{getStatusBadge(report.status)}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-view"
                      onClick={() => window.location.href = `/admin/laporan/detail/${report.id}`}
                    >
                      👁️ Lihat
                    </button>
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">Dalam Proses</option>
                      <option value="resolved">Selesai</option>
                      <option value="rejected">Ditolak</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                Tidak ada laporan ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;