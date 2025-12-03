import { useState } from 'react';

const HistoryFilters = ({ onFilterChange, filters }) => {
  const [localFilters, setLocalFilters] = useState({
    dateRange: filters.dateRange || 'today',
    actionType: filters.actionType || 'all',
    admin: filters.admin || 'all',
    status: filters.status || 'all',
    searchTerm: filters.searchTerm || ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'today',
      actionType: 'all',
      admin: 'all',
      status: 'all',
      searchTerm: ''
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Filter Riwayat</h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Search */}
          <Col md={6} lg={4}>
            <Form.Group>
              <Form.Label>Cari Aktivitas</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Cari berdasarkan deskripsi..."
                  value={localFilters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          {/* Date Range */}
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Periode</Form.Label>
              <Form.Select
                value={localFilters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="today">Hari Ini</option>
                <option value="yesterday">Kemarin</option>
                <option value="this-week">Minggu Ini</option>
                <option value="this-month">Bulan Ini</option>
                <option value="last-month">Bulan Lalu</option>
                <option value="custom">Custom Range</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Action Type */}
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Jenis Aktivitas</Form.Label>
              <Form.Select
                value={localFilters.actionType}
                onChange={(e) => handleFilterChange('actionType', e.target.value)}
              >
                <option value="all">Semua Aktivitas</option>
                <option value="create">Membuat Laporan</option>
                <option value="update">Update Status</option>
                <option value="delete">Hapus Data</option>
                <option value="assign">Assign Petugas</option>
                <option value="validate">Validasi</option>
                <option value="export">Export Data</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Admin Filter */}
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Admin</Form.Label>
              <Form.Select
                value={localFilters.admin}
                onChange={(e) => handleFilterChange('admin', e.target.value)}
              >
                <option value="all">Semua Admin</option>
                <option value="admin1">Admin 1</option>
                <option value="admin2">Admin 2</option>
                <option value="admin3">Admin 3</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Status Filter */}
          <Col md={6} lg={2}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={localFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="success">Berhasil</option>
                <option value="pending">Pending</option>
                <option value="failed">Gagal</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mt-3">
          <Col>
            <Button 
              variant="outline-secondary"
              onClick={resetFilters}
              size="sm"
            >
              <FaUndo className="me-1" />
              Reset Filter
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default HistoryFilters;