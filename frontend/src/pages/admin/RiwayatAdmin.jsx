import { useEffect, useState } from 'react';
import HistoryList from '../../components/admin/riwayatadmin/HistoryList';
import AdminLayout from '../../layouts/AdminLayout';
import { adminAPI } from '../../services/api';

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
    loadReportHistory();
  }, [filters]);

  const loadReportHistory = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status !== 'all') {
        params.status = filters.status;
      }
      
      const response = await adminAPI.getReportHistory(params);
      if (response.data.success) {
        // Transform API data to match component expectations
        const transformed = response.data.reports.map(r => ({
          id: r.id,
          timestamp: r.updatedAt || r.createdAt,
          actionType: 'report',
          actionName: `Status: ${r.status}`,
          description: r.description,
          title: r.title,
          location: r.location,
          target: `RPT-${r.id}`,
          admin: r.userName || 'Admin',
          status: r.status,
          photoUrl: r.photoUrl,
          photos: r.photos,
        }));
        setHistoryData(transformed);
      }
    } catch (error) {
      console.error('Load history error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Riwayat Laporan Admin</h5>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <HistoryList items={historyData} onDetail={(item) => console.log('Detail riwayat', item)} />
      )}
    </AdminLayout>
  );
};

export default HalamanRiwayatAdmin;