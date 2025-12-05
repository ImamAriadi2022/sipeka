import { useEffect, useState } from 'react';
import ReportList from '../../components/admin/kelolaalaporan/ReportList';
import AdminLayout from '../../layouts/AdminLayout';
import { adminAPI } from '../../services/api';

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
    fetchReports();
  }, [filters, pagination.page]);

  const fetchReports = async () => {
    try {
      const params = {};
      if (filters.status !== 'all') {
        params.status = filters.status;
      }
      if (filters.category !== 'all') {
        params.category = filters.category;
      }
      if (filters.search) {
        params.search = filters.search;
      }

      const response = await adminAPI.getAllReports(params);
      if (response.data.success) {
        console.log('Kelola Laporan - All reports:', response.data.reports); // Debug
        setReports(response.data.reports);
        setPagination(prev => ({ ...prev, total: response.data.reports.length }));
      }
    } catch (error) {
      console.error('Fetch reports error:', error);
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const response = await adminAPI.validateReport(reportId, newStatus);
      if (response.data.success) {
        // Reload reports after status change
        fetchReports();
      }
    } catch (error) {
      console.error('Update status error:', error);
      alert('Gagal mengupdate status laporan');
    }
  };

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Laporan Masuk</h5>
      <ReportList
        reports={reports}
        onDetail={(r) => console.log('Detail laporan', r)}
        onStatus={(r) => handleStatusChange(r.id, r.status)}
      />
    </AdminLayout>
  );
};

export default HalamanLaporanAdmin;