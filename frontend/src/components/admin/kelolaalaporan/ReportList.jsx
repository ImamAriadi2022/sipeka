import { useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import ReportItem from './ReportItem';

const ReportList = ({ reports, onDetail, onStatus }) => {
  const [selected, setSelected] = useState(null);

  const closeModal = () => setSelected(null);

  const openDetail = (r) => {
    setSelected(r);
    if (onDetail) onDetail(r);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      {reports.map((r) => (
        <ReportItem key={r.id} report={r} onDetail={openDetail} onStatus={onStatus} />
      ))}

      <Modal show={!!selected} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Laporan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div className="small">
              <div className="mb-2"><strong>ID Laporan:</strong> {selected.id}</div>
              <div className="mb-2"><strong>Lokasi:</strong> {selected.location}</div>
              <div className="mb-2"><strong>Judul:</strong> {selected.title}</div>
              <div className="mb-2"><strong>Tanggal:</strong> {selected.date || '-'}</div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <strong>Status:</strong>
                <Badge bg={selected.status === 'Ditolak' ? 'danger' : selected.status === 'Disetujui' || selected.status === 'Diterima' ? 'success' : 'warning'} text={selected.status === 'Menunggu' || selected.status === 'Proses' ? 'dark' : undefined}>
                  {selected.status || 'Menunggu'}
                </Badge>
              </div>
              {selected.description && (
                <div className="mb-2"><strong>Deskripsi:</strong> {selected.description}</div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportList;
