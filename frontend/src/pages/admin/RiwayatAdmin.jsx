import { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/riwayatadmin/AdminHeader';
import AdminSidebar from '../../components/admin/riwayatadmin/AdminSidebar';
import ExportButton from '../../components/admin/riwayatadmin/ExportButton';
import HistoryFilters from '../../components/admin/riwayatadmin/HistoryFilters';
import HistoryStats from '../../components/admin/riwayatadmin/HistoryStats';
import HistoryTable from '../../components/admin/riwayatadmin/HistoryTable';

const HalamanRiwayatAdmin = () => {
  const [history, setHistory] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'month',
    action: 'all',
    admin: 'all',
    search: ''
  });
  const [stats, setStats] = useState({
    totalActions: 0,
    reportsProcessed: 0,
    averageResponseTime: 0
  });

  useEffect(() => {
    // TODO: Fetch admin activity history
    const fetchHistory = async () => {
      // Implement API call
    };
    fetchHistory();
  }, [filters]);

  const handleExport = async (format) => {
    // TODO: Export history data
    console.log('Exporting history in format:', format);
  };

  return (
    <div className="halaman-riwayat-admin-page">
      <AdminSidebar />
      <div className="halaman-riwayat-admin-content">
        <AdminHeader title="Riwayat Aktivitas Admin" />
        <HistoryStats stats={stats} />
        <div className="history-controls">
          <HistoryFilters filters={filters} onFiltersChange={setFilters} />
          <ExportButton onExport={handleExport} />
        </div>
        <HistoryTable history={history} />
      </div>
    </div>
  );
};

export default HalamanRiwayatAdmin;