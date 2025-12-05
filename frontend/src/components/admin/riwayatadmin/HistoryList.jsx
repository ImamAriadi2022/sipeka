import { useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import HistoryItem from './HistoryItem';

const HistoryList = ({ items, onDetail }) => {
  const [selected, setSelected] = useState(null);

  const closeModal = () => setSelected(null);
  const openDetail = (item) => {
    setSelected(item);
    if (onDetail) onDetail(item);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      {items.map((it) => (
        <HistoryItem key={it.id} item={it} onDetail={openDetail} />
      ))}

      <Modal show={!!selected} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Riwayat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div className="small">
              <div className="mb-2"><strong>ID:</strong> {selected.id}</div>
              {selected.timestamp && (
                <div className="mb-2"><strong>Waktu:</strong> {selected.timestamp}</div>
              )}
              {selected.actionName && (
                <div className="mb-2"><strong>Aksi:</strong> {selected.actionName}</div>
              )}
              {selected.title && (
                <div className="mb-2"><strong>Judul:</strong> {selected.title}</div>
              )}
              {selected.location && (
                <div className="mb-2"><strong>Lokasi:</strong> {selected.location}</div>
              )}
              <div className="mb-2 d-flex align-items-center gap-2">
                <strong>Status:</strong>
                <Badge bg={selected.status === 'Ditolak' ? 'danger' : selected.status === 'Selesai' ? 'success' : 'warning'} text={selected.status === 'Proses' ? 'dark' : undefined}>
                  {selected.status || 'Proses'}
                </Badge>
              </div>
              {selected.description && (
                <div className="mb-2"><strong>Deskripsi:</strong> {selected.description}</div>
              )}
              <div className="mt-3">
                <div className="fw-bold mb-1">Foto Laporan</div>
                {(() => {
                  const photo = selected.photoUrl || selected.photo || selected.imageUrl || selected.image;
                  return photo ? (
                    <img src={photo} alt="Foto Laporan" style={{ maxWidth: '100%', borderRadius: 8 }} />
                  ) : (
                    <div className="text-muted">Tidak ada foto</div>
                  );
                })()}
              </div>
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

export default HistoryList;
