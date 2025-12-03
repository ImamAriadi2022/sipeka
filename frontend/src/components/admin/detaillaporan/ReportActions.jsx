import { useState } from 'react';

const ReportActions = ({ report, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(report?.status || 'pending');
  const [assignedOfficer, setAssignedOfficer] = useState(report?.assignedOfficer || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Menunggu Review', color: 'warning', icon: '⏳' },
    { value: 'in-progress', label: 'Sedang Ditangani', color: 'info', icon: '🔄' },
    { value: 'resolved', label: 'Selesai', color: 'success', icon: '✅' },
    { value: 'rejected', label: 'Ditolak', color: 'danger', icon: '❌' }
  ];

  const officers = [
    { id: 'officer1', name: 'Petugas Kebersihan A' },
    { id: 'officer2', name: 'Petugas Kebersihan B' },
    { id: 'officer3', name: 'Petugas Fasilitas A' },
    { id: 'officer4', name: 'Petugas Fasilitas B' }
  ];

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate({
        status: selectedStatus,
        assignedOfficer,
        timestamp: new Date().toISOString()
      });
      
      // Show success message
      alert('Status berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal memperbarui status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = statusOptions.find(opt => opt.value === status);
    if (!statusConfig) return status;
    
    return (
      <span className={`status-badge ${statusConfig.color}`}>
        {statusConfig.icon} {statusConfig.label}
      </span>
    );
  };

  const canUpdateStatus = () => {
    // Admin dapat mengubah status kecuali jika sudah resolved atau rejected
    return !['resolved', 'rejected'].includes(report?.status);
  };

  return (
    <div className="report-actions">
      <h3>Tindakan Laporan</h3>
      
      <div className="actions-content">
        {/* Current Status Display */}
        <div className="current-status">
          <h4>Status Saat Ini</h4>
          <div className="status-display">
            {getStatusBadge(report?.status || 'pending')}
            <small className="status-updated">
              Diperbarui: {report?.lastUpdated ? 
                new Date(report.lastUpdated).toLocaleString('id-ID') : 
                'Belum ada update'
              }
            </small>
          </div>
        </div>

        {/* Status Update Form */}
        {canUpdateStatus() && (
          <div className="status-update">
            <h4>Perbarui Status</h4>
            <div className="update-form">
              <div className="form-group">
                <label>Status Baru</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Assign Petugas</label>
                <select
                  value={assignedOfficer}
                  onChange={(e) => setAssignedOfficer(e.target.value)}
                  className="officer-select"
                >
                  <option value="">Pilih petugas...</option>
                  {officers.map((officer) => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating || !selectedStatus}
                className={`update-btn ${isUpdating ? 'updating' : ''}`}
              >
                {isUpdating ? '⏳ Memperbarui...' : '💾 Update Status'}
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h4>Tindakan Cepat</h4>
          <div className="action-buttons">
            <button 
              className="action-btn priority"
              onClick={() => {
                // TODO: Mark as priority
                alert('Fitur prioritas akan segera tersedia');
              }}
            >
              🔥 Tandai Prioritas
            </button>
            
            <button 
              className="action-btn escalate"
              onClick={() => {
                // TODO: Escalate to supervisor
                alert('Fitur eskalasi akan segera tersedia');
              }}
            >
              ⬆️ Eskalasi ke Atasan
            </button>
            
            <button 
              className="action-btn archive"
              onClick={() => {
                if (confirm('Yakin ingin mengarsipkan laporan ini?')) {
                  // TODO: Archive report
                  alert('Laporan berhasil diarsipkan');
                }
              }}
            >
              📁 Arsipkan
            </button>
            
            <button 
              className="action-btn export"
              onClick={() => {
                // TODO: Export report details
                alert('Mengekspor detail laporan...');
              }}
            >
              📤 Export Detail
            </button>
          </div>
        </div>

        {/* Action History */}
        <div className="action-history">
          <h4>Riwayat Tindakan</h4>
          <div className="history-list">
            {report?.actionHistory?.length ? (
              report.actionHistory.map((action, index) => (
                <div key={index} className="history-item">
                  <div className="history-icon">
                    {getStatusBadge(action.status).props.children[0]}
                  </div>
                  <div className="history-content">
                    <p className="history-action">{action.description}</p>
                    <small className="history-timestamp">
                      {new Date(action.timestamp).toLocaleString('id-ID')} 
                      {action.admin && ` oleh ${action.admin}`}
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-history">
                <span>📋</span>
                <p>Belum ada riwayat tindakan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportActions;