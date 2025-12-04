import { useEffect, useState } from 'react';
import HistoryList from '../../components/admin/riwayatadmin/HistoryList';
import AdminLayout from '../../layouts/AdminLayout';

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

  const reports = JSON.parse(localStorage.getItem('reports') || '[]');
  const historyItems = reports.map((r, idx) => ({
    id: r.id || idx + 1,
    location: r.location,
    title: r.title,
    status: r.status === 'Menunggu' ? 'Proses' : r.status || 'Selesai',
  }));

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Laporan Masuk</h5>
      <HistoryList items={historyItems} onDetail={(item) => console.log('Detil riwayat', item)} />
    </AdminLayout>
  );
};

export default HalamanRiwayatAdmin;