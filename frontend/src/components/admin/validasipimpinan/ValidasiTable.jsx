
const ValidasiTable = ({ laporanData, onValidasiLaporan }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      'menunggu-validasi': { class: 'badge-warning', text: 'Menunggu Validasi', icon: '⏳' },
      'disetujui': { class: 'badge-success', text: 'Disetujui', icon: '✅' },
      'ditolak': { class: 'badge-danger', text: 'Ditolak', icon: '❌' }
    };
    
    const statusInfo = statusMap[status] || { class: 'badge-secondary', text: status, icon: '❓' };
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        <span className="badge-icon">{statusInfo.icon}</span>
        {statusInfo.text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'tinggi': { class: 'priority-high', text: 'Tinggi' },
      'sedang': { class: 'priority-medium', text: 'Sedang' },
      'rendah': { class: 'priority-low', text: 'Rendah' }
    };
    
    const priorityInfo = priorityMap[priority] || { class: 'priority-medium', text: priority };
    return (
      <span className={`priority-badge ${priorityInfo.class}`}>
        {priorityInfo.text}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="validasi-table">
      <div className="table-header">
        <h3>Daftar Laporan untuk Validasi Pimpinan</h3>
        <p className="table-description">
          Klik "Validasi" untuk mencatat hasil validasi pimpinan yang dilakukan secara offline
        </p>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Laporan</th>
              <th>Judul & Kategori</th>
              <th>Pelapor</th>
              <th>Tanggal</th>
              <th>Prioritas</th>
              <th>Estimasi Biaya</th>
              <th>Status Validasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanData.length > 0 ? (
              laporanData.map((laporan) => (
                <tr key={laporan.id}>
                  <td className="laporan-id">
                    <strong>{laporan.id}</strong>
                  </td>
                  <td className="laporan-info">
                    <div className="laporan-title">{laporan.judul}</div>
                    <small className="laporan-category">{laporan.kategori}</small>
                  </td>
                  <td className="pelapor-info">
                    <div className="pelapor-name">{laporan.pelapor}</div>
                    <small className="pelapor-nim">NIM: {laporan.nim}</small>
                  </td>
                  <td>{laporan.tanggalLaporan}</td>
                  <td>{getPriorityBadge(laporan.prioritas)}</td>
                  <td className="estimasi-biaya">
                    {formatCurrency(laporan.estimasiBiaya)}
                  </td>
                  <td>{getStatusBadge(laporan.statusValidasiPimpinan)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-view"
                        onClick={() => window.open(`/admin/laporan/detail/${laporan.id}`, '_blank')}
                        title="Lihat Detail Laporan"
                      >
                        👁️ Detail
                      </button>
                      
                      {laporan.statusValidasiPimpinan === 'menunggu-validasi' ? (
                        <button 
                          className="btn-validasi"
                          onClick={() => onValidasiLaporan(laporan)}
                          title="Catat Hasil Validasi Pimpinan"
                        >
                          ✅ Validasi
                        </button>
                      ) : (
                        <button 
                          className="btn-edit-validasi"
                          onClick={() => onValidasiLaporan(laporan)}
                          title="Edit Hasil Validasi"
                        >
                          ✏️ Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">📋</span>
                    <h4>Tidak ada laporan ditemukan</h4>
                    <p>Tidak ada laporan yang perlu validasi pimpinan saat ini.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidasiTable;