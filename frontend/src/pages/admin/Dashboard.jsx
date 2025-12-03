import { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/dashboard/AdminHeader';
import AdminSidebar from '../../components/admin/dashboard/AdminSidebar';
import AdminStatsCard from '../../components/admin/dashboard/AdminStatsCard';
import ReportsOverview from '../../components/admin/dashboard/ReportsOverview';
import SystemHealth from '../../components/admin/dashboard/SystemHealth';
import UserActivity from '../../components/admin/dashboard/UserActivity';

const DashboardAdmin = () => {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    activeUsers: 0,
    systemUptime: '99.9%'
  });

  useEffect(() => {
    // TODO: Fetch admin dashboard data
    const fetchAdminData = async () => {
      // Implement API call
    };
    fetchAdminData();
  }, []);

  return (
    <div className="dashboard-admin-page">
      <AdminSidebar />
      <div className="dashboard-admin-content">
        <AdminHeader title="Dashboard Admin" />
        <div className="admin-stats-grid">
          <AdminStatsCard title="Total Users" value={adminStats.totalUsers} />
          <AdminStatsCard title="Total Laporan" value={adminStats.totalReports} />
          <AdminStatsCard title="Laporan Pending" value={adminStats.pendingReports} />
          <AdminStatsCard title="Laporan Selesai" value={adminStats.resolvedReports} />
          <AdminStatsCard title="User Aktif" value={adminStats.activeUsers} />
          <AdminStatsCard title="System Uptime" value={adminStats.systemUptime} />
        </div>
        <div className="admin-widgets">
          <ReportsOverview />
          <UserActivity />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;