import { Badge, Button, Card } from 'react-bootstrap';

const statusBadge = (status) => {
  if (status === 'Proses' || status === 'Menunggu') return <Badge bg="warning" text="dark">{status}</Badge>;
  if (status === 'Diterima' || status === 'Disetujui') return <Badge bg="success">{status}</Badge>;
  if (status === 'Ditolak') return <Badge bg="danger">{status}</Badge>;
  return <Badge bg="secondary">{status}</Badge>;
};

const ReportItem = ({ report, onDetail, onStatus }) => {
  return (
    <Card className="mb-3" style={{ border: '3px solid #2b5cab', borderRadius: 10 }}>
      <Card.Body style={{ background: '#ffffff' }}>
        <div className="mb-2">
          <div className="small fw-bold">ID Laporan : {String(report.id).slice(-3)}</div>
          <div className="small">Lokasi Kerusakan : {report.location}</div>
          <div className="small">Laporan : {report.title}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="light" onClick={() => onDetail(report)}>Detail</Button>
          <div className="d-flex align-items-center gap-2">
            <span>Status</span>
            {statusBadge(report.status || 'Menunggu')}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReportItem;
