import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import AdminChart from '../../components/admin/dashboard/AdminChart';
import AdminStats from '../../components/admin/dashboard/AdminStats';
import AdminLayout from '../../layouts/AdminLayout';
import { adminAPI } from '../../services/api';

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    totalMasuk: 0,
    selesai: 0,
    proses: 0,
    verifikasi: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await adminAPI.getStatistics();
      if (response.data.success) {
        const { statistics } = response.data;
        setStats({
          totalMasuk: statistics.totalReports || 0,
          selesai: statistics.completedReports || 0,
          proses: statistics.inProgressReports || 0,
          verifikasi: statistics.pendingReports || 0,
        });
      }
    } catch (error) {
      console.error('Fetch admin data error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Dashboard</h5>
      <Card className="mx-auto" style={{ maxWidth: '900px', border: '4px solid #2b5cab', borderRadius: 10 }}>
        <Card.Body style={{ background: '#eef3fb', padding: 18 }}>
          {loading ? (
            <div className="text-center py-5">Memuat data...</div>
          ) : (
            <div className="mx-auto" style={{ maxWidth: '820px' }}>
              <AdminChart total={stats.totalMasuk} />
              <AdminStats selesai={stats.selesai} proses={stats.proses} verifikasi={stats.verifikasi} />
            </div>
          )}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default DashboardAdmin;