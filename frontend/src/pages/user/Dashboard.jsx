import { useEffect, useState } from 'react';
import Header from '../../components/user/dashboard/Header';
import QuickActions from '../../components/user/dashboard/QuickActions';
import RecentReports from '../../components/user/dashboard/RecentReports';
import Sidebar from '../../components/user/dashboard/Sidebar';
import StatsCard from '../../components/user/dashboard/StatsCard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    completedReports: 0,
    monthlyReports: 0
  });

  useEffect(() => {
    // TODO: Fetch dashboard data
    const fetchDashboardData = async () => {
      // Implement API call
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Header title="Dashboard" />
        <div className="dashboard-stats">
          <StatsCard title="Total Laporan" value={stats.totalReports} />
          <StatsCard title="Laporan Pending" value={stats.pendingReports} />
          <StatsCard title="Laporan Selesai" value={stats.completedReports} />
          <StatsCard title="Laporan Bulan Ini" value={stats.monthlyReports} />
        </div>
        <div className="dashboard-widgets">
          <RecentReports />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;