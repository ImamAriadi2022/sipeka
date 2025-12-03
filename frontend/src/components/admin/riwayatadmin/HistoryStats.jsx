
import { Card, Col, Row } from 'react-bootstrap';
import { FaChartBar, FaClipboard, FaClock, FaUsers } from 'react-icons/fa';

const HistoryStats = ({ stats }) => {
  const statsData = [
    {
      title: 'Total Aktivitas',
      value: stats?.totalActions || 0,
      icon: FaChartBar,
      color: 'primary',
      description: 'Total aktivitas admin hari ini'
    },
    {
      title: 'Laporan Diproses',
      value: stats?.reportsProcessed || 0,
      icon: FaClipboard,
      color: 'success',
      description: 'Laporan yang diproses hari ini'
    },
    {
      title: 'Waktu Resp. Rata-rata',
      value: `${stats?.averageResponseTime || 0}h`,
      icon: FaClock,
      color: 'info',
      description: 'Rata-rata waktu respon admin'
    },
    {
      title: 'Admin Aktif',
      value: '3',
      icon: FaUsers,
      color: 'warning',
      description: 'Jumlah admin yang aktif hari ini'
    }
  ];

  return (
    <div className="mb-4">
      <h4 className="mb-3">Statistik Aktivitas Admin</h4>
      <Row>
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Col md={6} lg={3} key={index} className="mb-3">
              <Card className={`border-${stat.color} h-100`}>
                <Card.Body className="d-flex align-items-center">
                  <div className={`rounded-circle bg-${stat.color} text-white d-flex align-items-center justify-content-center me-3`} style={{ width: '50px', height: '50px' }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{stat.value}</h5>
                    <p className="mb-1 fw-bold">{stat.title}</p>
                    <small className="text-muted">{stat.description}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HistoryStats;