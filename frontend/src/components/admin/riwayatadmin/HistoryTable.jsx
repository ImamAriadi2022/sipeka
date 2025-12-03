import { useState } from 'react';
import { Badge, Button, Card, Spinner, Table } from 'react-bootstrap';
import { FaEye, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

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
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort className="text-muted" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { label: 'Berhasil', variant: 'success' },
      pending: { label: 'Pending', variant: 'warning' },
      failed: { label: 'Gagal', variant: 'danger' }
    };
    
    const config = statusConfig[status] || { label: status, variant: 'secondary' };
    return <Badge bg={config.variant}>{config.label}</Badge>;
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
      <Card>
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 mb-0">Memuat riwayat aktivitas...</p>
        </Card.Body>
      </Card>
    );
  }

  const sortedData = sortData(historyData || [], sortConfig);

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Riwayat Aktivitas ({(historyData || []).length} aktivitas)</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0">
          <thead className="table-dark">
            <tr>
              <th 
                onClick={() => handleSort('timestamp')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                Waktu {getSortIcon('timestamp')}
              </th>
              <th 
                onClick={() => handleSort('actionType')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                Aktivitas {getSortIcon('actionType')}
              </th>
              <th 
                onClick={() => handleSort('description')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                Deskripsi {getSortIcon('description')}
              </th>
              <th 
                onClick={() => handleSort('admin')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                Admin {getSortIcon('admin')}
              </th>
              <th 
                onClick={() => handleSort('status')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                Status {getSortIcon('status')}
              </th>
              <th width="100">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div>
                    <div className="fs-1">📭</div>
                    <p className="mb-1">Tidak ada riwayat aktivitas ditemukan</p>
                    <small className="text-muted">Coba ubah filter atau periode waktu</small>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => {
                const datetime = formatDateTime(item.timestamp);
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <div className="fw-bold">{datetime.date}</div>
                        <small className="text-muted">{datetime.time}</small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2">{getActionIcon(item.actionType)}</span>
                        <span>{item.actionName}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.description}
                        {item.target && (
                          <div><small className="text-muted">Target: {item.target}</small></div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{item.admin}</div>
                        <small className="text-muted">{item.adminRole}</small>
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(item.status)}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          console.log('Show detail for:', item);
                        }}
                        title="Lihat detail aktivitas"
                      >
                        <FaEye />
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default HistoryTable;