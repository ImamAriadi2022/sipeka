import { Badge, Button, Table } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const ValidasiPimpinan = () => {
  const reports = JSON.parse(localStorage.getItem('reports') || '[]');

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
                  <Button variant="success" size="sm" onClick={() => updateStatus(r.id, 'Disetujui')}>Setujui</Button>
                  <Button variant="danger" size="sm" onClick={() => updateStatus(r.id, 'Ditolak')}>Tolak</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ValidasiPimpinan;