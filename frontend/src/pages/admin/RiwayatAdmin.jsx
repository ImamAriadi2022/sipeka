import { useEffect, useState } from 'react';
import AdminHeader from '../components/halamanriwayatadmin/AdminHeader';
import AdminSidebar from '../components/halamanriwayatadmin/AdminSidebar';
import ExportButton from '../components/halamanriwayatadmin/ExportButton';
import HistoryFilters from '../components/halamanriwayatadmin/HistoryFilters';
import HistoryStats from '../components/halamanriwayatadmin/HistoryStats';
import HistoryTable from '../components/halamanriwayatadmin/HistoryTable';

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