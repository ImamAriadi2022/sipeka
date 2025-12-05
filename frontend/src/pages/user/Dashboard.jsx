import { useEffect, useState } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { reportsAPI } from '../../services/api';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    menunggu: 3,
    diterima: 2,
    proses: 2,
    selesai: 12,
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const params = {};
      if (currentUser.id) {
        params.user_id = currentUser.id;
      }
      
      const response = await reportsAPI.getAll(params);
      if (response.data.success) {
        const reports = response.data.reports;
        setSummary({
          menunggu: reports.filter(r => r.status === 'Menunggu').length,
          diterima: reports.filter(r => r.status === 'Disetujui').length,
          proses: reports.filter(r => r.status === 'Proses').length,
          selesai: reports.filter(r => r.status === 'Selesai').length,
        });
      }
    } catch (error) {
      console.error('Load stats error:', error);
    }
  };

  const goToCreate = () => {
    window.history.pushState({}, '', '/buat-laporan');
    window.location.reload();
  };

  return (
      <>
        {/* Title */}
        <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Laporan Kerusakan</h5>

        {/* Summary Card */}
        <Card className="mx-auto" style={{
          maxWidth: '900px',
          minHeight: '420px',
          backgroundColor: '#f3f6fb',
          borderRadius: '10px',
          border: '4px solid #2b5cab'
        }}>
          <Card.Body>
            <div className="text-center mb-3" style={{ color: '#333' }}>
              <strong>Ringkasan Status Laporan</strong>
            </div>

            {/* Badges Row */}
            <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
              <Badge pill bg="" style={{ backgroundColor: '#e16363', color: '#fff', padding: '8px 14px' }}>
                Menunggu ({summary.menunggu})
              </Badge>
              <Badge pill bg="" style={{ backgroundColor: '#f0a23b', color: '#fff', padding: '8px 14px' }}>
                Diterima ({summary.diterima})
              </Badge>
              <Badge pill bg="" style={{ backgroundColor: '#f2d24b', color: '#333', padding: '8px 14px' }}>
                Proses ({summary.proses})
              </Badge>
              <Badge pill bg="" style={{ backgroundColor: '#37c459', color: '#fff', padding: '8px 14px' }}>
                Selesai ({summary.selesai})
              </Badge>
            </div>

            {/* Create Report Action */}
            <div className="mx-auto" style={{ maxWidth: '820px' }}>
              <div
                role="button"
                onClick={goToCreate}
                className="d-flex align-items-center justify-content-between px-3"
                style={{
                  height: '40px',
                  background: '#fff',
                  border: '2px solid #ced4da',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ color: '#333', fontSize: '14px' }}>Buat Laporan</span>
                <span className="bi bi-pencil" style={{ color: '#666' }}></span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
  );
};

export default Dashboard;