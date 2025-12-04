import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import AdminChart from '../../components/admin/dashboard/AdminChart';
import AdminStats from '../../components/admin/dashboard/AdminStats';
import AdminLayout from '../../layouts/AdminLayout';

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    totalMasuk: 670,
    selesai: 550,
    proses: 100,
    verifikasi: 20,
  });

  useEffect(() => {
    // TODO: Fetch admin dashboard data
    const fetchAdminData = async () => {
      // Implement API call
    };
    fetchAdminData();
  }, []);

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Dashboard</h5>
      <Card className="mx-auto" style={{ maxWidth: '900px', border: '4px solid #2b5cab', borderRadius: 10 }}>
        <Card.Body style={{ background: '#eef3fb', padding: 18 }}>
          <div className="mx-auto" style={{ maxWidth: '820px' }}>
            <AdminChart total={stats.totalMasuk} />
            <AdminStats selesai={stats.selesai} proses={stats.proses} verifikasi={stats.verifikasi} />
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default DashboardAdmin;