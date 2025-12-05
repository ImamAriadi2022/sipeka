import { useState } from 'react';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const ValidasiPimpinan = () => {
  const reports = JSON.parse(localStorage.getItem('reports') || '[]');
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => {
    const updated = reports.map(r => (r.id === id ? { ...r, status } : r));
    localStorage.setItem('reports', JSON.stringify(updated));
    window.location.reload();
  };

  const pending = reports.filter(r => r.status === 'Menunggu');

  return (
    <AdminLayout>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Validasi Pimpinan</h5>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Lokasi</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pending.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">Tidak ada laporan menunggu.</td>
              </tr>
            )}
            {pending.map((r, idx) => (
              <tr key={r.id}>
                <td>{idx + 1}</td>
                <td>{r.title}</td>
                <td>{r.location}</td>
                <td>{r.date}</td>
                <td><Badge bg="warning" text="dark">{r.status}</Badge></td>
                <td className="d-flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => setSelected(r)}>Detail</Button>
                  <Button variant="success" size="sm" onClick={() => updateStatus(r.id, 'Disetujui')}>Setujui</Button>
                  <Button variant="danger" size="sm" onClick={() => updateStatus(r.id, 'Ditolak')}>Tolak</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
                <Badge bg={selected.status === 'Ditolak' ? 'danger' : selected.status === 'Disetujui' || selected.status === 'Diterima' ? 'success' : 'warning'} text={selected.status === 'Menunggu' ? 'dark' : undefined}>{selected.status}</Badge>
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
          <Button variant="secondary" onClick={() => setSelected(null)}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default ValidasiPimpinan;