import { useEffect, useState } from 'react';
import ReportList from '../../components/admin/kelolaalaporan/ReportList';
import AdminLayout from '../../layouts/AdminLayout';

const HalamanLaporanAdmin = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dateRange: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  useEffect(() => {
    // TODO: Fetch reports data
    const fetchReports = async () => {
      // Implement API call with filters and pagination
    };
    fetchReports();
  }, [filters, pagination.page]);

  const handleStatusChange = async (reportId, newStatus) => {
    // TODO: Update report status
    console.log('Updating report status:', reportId, newStatus);
  };

  const storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
  const list = storedReports.map((r, i) => ({ ...r, id: r.id || i + 1 }));

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Laporan Masuk</h5>
      <ReportList
        reports={list}
        onDetail={(r) => console.log('Detail laporan', r)}
        onStatus={(r) => handleStatusChange(r.id, r.status)}
      />
    </AdminLayout>
  );
};

export default HalamanLaporanAdmin;