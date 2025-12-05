import { useEffect, useState } from 'react';
import { Badge, Button, Card, ListGroup, Modal } from 'react-bootstrap';
import { FiCalendar, FiMapPin, FiTag } from 'react-icons/fi';
import { reportsAPI } from '../../services/api';

const RiwayatLaporan = () => {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadUserReports();
  }, []);

  const loadUserReports = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const params = {};
      if (currentUser.id) {
        params.user_id = currentUser.id;
      }
      
      const response = await reportsAPI.getAll(params);
      if (response.data.success) {
        setReports(response.data.reports);
      }
    } catch (error) {
      console.error('Load reports error:', error);
      // Fallback to localStorage if API fails
      const stored = JSON.parse(localStorage.getItem('reports') || '[]');
      setReports(stored);
    }
  };

  const statusVariant = (s) => {
    if (s === 'Ditolak') return 'danger';
    if (s === 'Selesai' || s === 'Disetujui' || s === 'Diterima') return 'success';
    if (s === 'Menunggu') return 'warning';
    return 'secondary';
  };

  return (
    <>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Riwayat Laporan</h5>
      <Card className="mx-auto" style={{ maxWidth: '900px', border: '4px solid #2b5cab', borderRadius: 10 }}>
        <Card.Body style={{ background: '#f3f6fb', padding: 18 }}>
          <ListGroup variant="flush">
            {reports.length === 0 && (
              <div className="text-center text-muted py-4">Belum ada laporan</div>
            )}
            {reports.map((r) => (
              <ListGroup.Item key={r.id} className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="fw-bold">{r.title}</div>
                  <div className="small text-muted d-flex gap-3">
                    <span className="d-inline-flex align-items-center gap-1"><FiMapPin /> {r.location}</span>
                    <span className="d-inline-flex align-items-center gap-1"><FiCalendar /> {r.date || '-'}</span>
                    <span className="d-inline-flex align-items-center gap-1"><FiTag /> {r.category || '-'}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Badge bg={statusVariant(r.status)}>{r.status || 'Menunggu'}</Badge>
                  <Button size="sm" variant="primary" onClick={() => setSelected(r)}>Detail</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Laporan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div className="small">
              <div className="mb-2"><strong>Judul:</strong> {selected.title}</div>
              <div className="mb-2"><strong>Lokasi:</strong> {selected.location}</div>
              <div className="mb-2"><strong>Tanggal:</strong> {selected.date || '-'}</div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <strong>Status:</strong>
                <Badge bg={statusVariant(selected.status)}>{selected.status || 'Menunggu'}</Badge>
              </div>
              {selected.description && (
                <div className="mb-2"><strong>Deskripsi:</strong> {selected.description}</div>
              )}
              <div className="mt-3">
                <div className="fw-bold mb-1">Foto</div>
                {(() => {
                  // Check photoUrl first (main photo)
                  if (selected.photoUrl) {
                    return <img src={selected.photoUrl} alt="Foto Laporan" style={{ maxWidth: '100%', borderRadius: 8 }} />;
                  }
                  // Check photos array
                  if (selected.photos && selected.photos.length > 0) {
                    return (
                      <div className="d-flex flex-wrap gap-2">
                        {selected.photos.map((photo, idx) => (
                          <img key={idx} src={photo} alt={`Foto ${idx + 1}`} style={{ maxWidth: '100%', borderRadius: 8 }} />
                        ))}
                      </div>
                    );
                  }
                  return <div className="text-muted">Tidak ada foto</div>;
                })()}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RiwayatLaporan;