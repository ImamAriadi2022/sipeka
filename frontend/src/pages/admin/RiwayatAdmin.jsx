import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminHeader from '../../components/admin/riwayatadmin/AdminHeader';
import AdminSidebar from '../../components/admin/riwayatadmin/AdminSidebar';
import ExportButton from '../../components/admin/riwayatadmin/ExportButton';
import HistoryFilters from '../../components/admin/riwayatadmin/HistoryFilters';
import HistoryStats from '../../components/admin/riwayatadmin/HistoryStats';
import HistoryTable from '../../components/admin/riwayatadmin/HistoryTable';

const HalamanRiwayatAdmin = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'month',
    actionType: 'all',
    admin: 'all',
    status: 'all',
    searchTerm: ''
  });
  const [stats, setStats] = useState({
    totalActions: 125,
    reportsProcessed: 42,
    averageResponseTime: 2.5
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockData = [
      {
        id: 1,
        timestamp: '2024-12-03T10:30:00Z',
        actionType: 'create',
        actionName: 'Membuat Laporan',
        description: 'Admin membuat laporan kerusakan fasilitas',
        target: 'RPT-001',
        admin: 'Admin 1',
        adminRole: 'Administrator',
        status: 'success'
      },
      {
        id: 2,
        timestamp: '2024-12-03T09:15:00Z',
        actionType: 'update',
        actionName: 'Update Status',
        description: 'Mengubah status laporan menjadi dalam proses',
        target: 'RPT-002',
        admin: 'Admin 2',
        adminRole: 'Moderator',
        status: 'success'
      }
    ];
    
    setHistoryData(mockData);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: Fetch filtered data
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Riwayat Aktivitas Admin" />
        <Container fluid className="py-4">
          <HistoryStats stats={stats} />
          <HistoryFilters filters={filters} onFilterChange={handleFilterChange} />
          <Row>
            <Col lg={8}>
              <HistoryTable historyData={historyData} loading={loading} />
            </Col>
            <Col lg={4}>
              <ExportButton historyData={historyData} filters={filters} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HalamanRiwayatAdmin;