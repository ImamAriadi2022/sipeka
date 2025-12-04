import { Badge, Button, Card } from 'react-bootstrap';

const statusBadge = (status) => {
  if (status === 'Selesai' || status === 'Disetujui') return <Badge bg="success">{status}</Badge>;
  if (status === 'Proses' || status === 'Menunggu') return <Badge bg="warning" text="dark">{status}</Badge>;
  if (status === 'Ditolak') return <Badge bg="danger">{status}</Badge>;
  return <Badge bg="secondary">{status}</Badge>;
};

const HistoryItem = ({ item, onDetail }) => {
  return (
    <Card className="mb-3" style={{ border: '3px solid #2b5cab', borderRadius: 10 }}>
      <Card.Body style={{ background: '#ffffff' }}>
        <div className="mb-2">
          <div className="small fw-bold">ID Laporan : {String(item.id).padStart(3, '0')}</div>
          <div className="small">Lokasi Kerusakan : {item.location}</div>
          <div className="small">Laporan : {item.title}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="light" onClick={() => onDetail(item)}>Detil</Button>
          <div className="d-flex align-items-center gap-2">
            <span>Status</span>
            {statusBadge(item.status || 'Selesai')}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HistoryItem;
