
const ReportDetailCard = ({ report }) => {
  // Mock data if report is null - replace with actual API data
  const reportData = report || {
    id: 'RPT-2024-001',
    title: 'Kerusakan Fasilitas Umum di Taman Kota',
    description: 'Terdapat kerusakan pada bangku taman dan lampu penerangan yang tidak berfungsi di area taman kota bagian utara. Kondisi ini sudah berlangsung selama 3 hari dan mengganggu aktivitas warga yang biasa beraktivitas di taman tersebut.',
    category: 'Fasilitas Umum',
    priority: 'Medium',
    status: 'pending',
    createdDate: '2024-01-15T08:30:00Z',
    lastUpdated: '2024-01-15T10:15:00Z',
    reporter: {
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '081234567890',
      address: 'Jl. Merdeka No. 123, Kelurahan ABC'
    },
    assignedOfficer: 'Petugas Fasilitas A',
    estimatedCompletion: '2024-01-20',
    urgencyLevel: 'medium'
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Menunggu Review', class: 'warning', icon: '⏳' },
      'in-progress': { label: 'Sedang Ditangani', class: 'info', icon: '🔄' },
      resolved: { label: 'Selesai', class: 'success', icon: '✅' },
      rejected: { label: 'Ditolak', class: 'danger', icon: '❌' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'secondary', icon: '📋' };
    return (
      <span className={`status-badge ${config.class}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { label: 'Rendah', class: 'low', icon: '🟢' },
      medium: { label: 'Sedang', class: 'medium', icon: '🟡' },
      high: { label: 'Tinggi', class: 'high', icon: '🟠' },
      urgent: { label: 'Mendesak', class: 'urgent', icon: '🔴' }
    };
    
    const config = priorityConfig[priority?.toLowerCase()] || { label: priority, class: 'medium', icon: '🟡' };
    return (
      <span className={`priority-badge ${config.class}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDaysOpen = (createdDate) => {
    const created = new Date(createdDate);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="report-detail-card">
      <div className="card-header">
        <div className="header-left">
          <h2 className="report-title">{reportData.title}</h2>
          <div className="report-meta">
            <span className="report-id">ID: {reportData.id}</span>
            <span className="report-category">📁 {reportData.category}</span>
          </div>
        </div>
        <div className="header-right">
          <div className="status-priority">
            {getStatusBadge(reportData.status)}
            {getPriorityBadge(reportData.priority)}
          </div>
        </div>
      </div>

      <div className="card-content">
        {/* Report Description */}
        <div className="section description-section">
          <h4>Deskripsi Laporan</h4>
          <p className="report-description">{reportData.description}</p>
        </div>

        {/* Timeline Information */}
        <div className="section timeline-section">
          <h4>Timeline</h4>
          <div className="timeline-grid">
            <div className="timeline-item">
              <span className="timeline-label">📅 Dilaporkan</span>
              <span className="timeline-value">{formatDateTime(reportData.createdDate)}</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-label">🔄 Update Terakhir</span>
              <span className="timeline-value">{formatDateTime(reportData.lastUpdated)}</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-label">📊 Hari Terbuka</span>
              <span className="timeline-value">{calculateDaysOpen(reportData.createdDate)} hari</span>
            </div>
            {reportData.estimatedCompletion && (
              <div className="timeline-item">
                <span className="timeline-label">🎯 Target Selesai</span>
                <span className="timeline-value">
                  {new Date(reportData.estimatedCompletion).toLocaleDateString('id-ID')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Reporter Information */}
        <div className="section reporter-section">
          <h4>Informasi Pelapor</h4>
          <div className="reporter-grid">
            <div className="reporter-item">
              <span className="reporter-label">👤 Nama</span>
              <span className="reporter-value">{reportData.reporter.name}</span>
            </div>
            <div className="reporter-item">
              <span className="reporter-label">📧 Email</span>
              <span className="reporter-value">
                <a href={`mailto:${reportData.reporter.email}`}>
                  {reportData.reporter.email}
                </a>
              </span>
            </div>
            <div className="reporter-item">
              <span className="reporter-label">📱 Telepon</span>
              <span className="reporter-value">
                <a href={`tel:${reportData.reporter.phone}`}>
                  {reportData.reporter.phone}
                </a>
              </span>
            </div>
            <div className="reporter-item">
              <span className="reporter-label">📍 Alamat</span>
              <span className="reporter-value">{reportData.reporter.address}</span>
            </div>
          </div>
        </div>

        {/* Assignment Information */}
        <div className="section assignment-section">
          <h4>Penugasan</h4>
          <div className="assignment-info">
            <div className="assignment-item">
              <span className="assignment-label">👷 Petugas Ditugaskan</span>
              <span className="assignment-value">
                {reportData.assignedOfficer || (
                  <span className="unassigned">Belum ditugaskan</span>
                )}
              </span>
            </div>
            <div className="assignment-item">
              <span className="assignment-label">⚡ Tingkat Urgensi</span>
              <span className="assignment-value">
                {getPriorityBadge(reportData.urgencyLevel)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section actions-section">
          <h4>Tindakan Cepat</h4>
          <div className="quick-actions">
            <button 
              className="action-btn contact"
              onClick={() => window.open(`tel:${reportData.reporter.phone}`)}
            >
              📞 Hubungi Pelapor
            </button>
            <button 
              className="action-btn email"
              onClick={() => window.open(`mailto:${reportData.reporter.email}`)}
            >
              📧 Kirim Email
            </button>
            <button 
              className="action-btn location"
              onClick={() => {
                // TODO: Open location in map
                alert('Fitur peta akan segera tersedia');
              }}
            >
              🗺️ Lihat Lokasi
            </button>
            <button 
              className="action-btn print"
              onClick={() => window.print()}
            >
              🖨️ Print Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailCard;