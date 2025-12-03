import { useState } from 'react';

const HistoryTable = ({ historyData, loading }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc'
  });

  const sortData = (data, config) => {
    return [...data].sort((a, b) => {
      if (config.key === 'timestamp') {
        return config.direction === 'asc' 
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      }
      
      if (a[config.key] < b[config.key]) {
        return config.direction === 'asc' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▲▼';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { label: 'Berhasil', class: 'success' },
      pending: { label: 'Pending', class: 'warning' },
      failed: { label: 'Gagal', class: 'danger' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'secondary' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getActionIcon = (actionType) => {
    const icons = {
      create: '📝',
      update: '✏️',
      delete: '🗑️',
      assign: '👤',
      validate: '✅',
      export: '📤'
    };
    return icons[actionType] || '📋';
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('id-ID'),
      time: date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  if (loading) {
    return (
      <div className="history-table loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Memuat riwayat aktivitas...</p>
        </div>
      </div>
    );
  }

  const sortedData = sortData(historyData, sortConfig);

  return (
    <div className="history-table">
      <div className="table-header">
        <h4>Riwayat Aktivitas ({historyData.length} aktivitas)</h4>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('timestamp')} className="sortable">
                Waktu {getSortIcon('timestamp')}
              </th>
              <th onClick={() => handleSort('actionType')} className="sortable">
                Aktivitas {getSortIcon('actionType')}
              </th>
              <th onClick={() => handleSort('description')} className="sortable">
                Deskripsi {getSortIcon('description')}
              </th>
              <th onClick={() => handleSort('admin')} className="sortable">
                Admin {getSortIcon('admin')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {getSortIcon('status')}
              </th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-message">
                    <span>📭</span>
                    <p>Tidak ada riwayat aktivitas ditemukan</p>
                    <small>Coba ubah filter atau periode waktu</small>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => {
                const datetime = formatDateTime(item.timestamp);
                return (
                  <tr key={index} className="table-row">
                    <td className="datetime-cell">
                      <div className="datetime">
                        <span className="date">{datetime.date}</span>
                        <span className="time">{datetime.time}</span>
                      </div>
                    </td>
                    <td className="action-cell">
                      <div className="action-info">
                        <span className="action-icon">
                          {getActionIcon(item.actionType)}
                        </span>
                        <span className="action-name">{item.actionName}</span>
                      </div>
                    </td>
                    <td className="description-cell">
                      <div className="description">
                        {item.description}
                        {item.target && (
                          <small className="target-info">
                            Target: {item.target}
                          </small>
                        )}
                      </div>
                    </td>
                    <td className="admin-cell">
                      <div className="admin-info">
                        <span className="admin-name">{item.admin}</span>
                        <small className="admin-role">{item.adminRole}</small>
                      </div>
                    </td>
                    <td className="status-cell">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="detail-btn"
                        onClick={() => {
                          // TODO: Implement detail view
                          console.log('Show detail for:', item);
                        }}
                        title="Lihat detail aktivitas"
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;