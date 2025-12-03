import { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/kelolaalaporan/AdminHeader';
import AdminSidebar from '../../components/admin/kelolaalaporan/AdminSidebar';
import ReportFilters from '../../components/admin/kelolaalaporan/ReportFilters';
import ReportPagination from '../../components/admin/kelolaalaporan/ReportPagination';
import ReportTable from '../../components/admin/kelolaalaporan/ReportTable';

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

  return (
    <div className="halaman-laporan-admin-page">
      <AdminSidebar />
      <div className="halaman-laporan-admin-content">
        <AdminHeader title="Kelola Laporan" />
        <ReportFilters filters={filters} onFiltersChange={setFilters} />
        <ReportTable 
          reports={reports} 
          onStatusChange={handleStatusChange}
        />
        <ReportPagination 
          pagination={pagination}
          onPageChange={(page) => setPagination(prev => ({...prev, page}))}
        />
      </div>
    </div>
  );
};

export default HalamanLaporanAdmin;