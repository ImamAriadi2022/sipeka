import { useState } from 'react';
import { Badge, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { FiCalendar, FiEdit, FiImage } from 'react-icons/fi';

const RiwayatLaporan = () => {
  const [report, setReport] = useState({
    location: 'Kamar Mandi lantai 1 gedung H Teknik Elektro',
    title: 'Kran air tidak hidup',
    date: '2025-10-10',
    status: 'Menunggu',
  });

  return (
    <>
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Riwayat Laporan</h5>
      <Card className="mx-auto" style={{ maxWidth: '900px', border: '4px solid #2b5cab', borderRadius: 10 }}>
        <Card.Body style={{ background: '#f3f6fb', padding: 18 }}>
          <div className="mx-auto" style={{ maxWidth: '820px' }}>
            <div className="mb-3">
              <div className="fw-bold small mb-1">Lokasi Kerusakan</div>
              <InputGroup>
                <Form.Control type="text" value={report.location} readOnly />
                <span className="input-group-text"><FiEdit /></span>
              </InputGroup>
            </div>

            <div className="mb-3">
              <div className="fw-bold small mb-1">Jenis Kerusakan</div>
              <InputGroup>
                <Form.Control type="text" value={report.title} readOnly />
                <span className="input-group-text"><FiEdit /></span>
              </InputGroup>
            </div>

            <div className="mb-3">
              <div className="fw-bold small mb-1">Tanggal Pelaporan</div>
              <InputGroup>
                <Form.Control type="date" value={report.date} readOnly />
                <span className="input-group-text"><FiCalendar /></span>
              </InputGroup>
            </div>

            <div className="mb-3">
              <div className="fw-bold small mb-1">Status Laporan</div>
              <Badge bg="danger">{report.status}</Badge>
            </div>

            <div className="mb-4 d-flex justify-content-center">
              <div style={{ width: 140, height: 100, border: '2px dashed #cfd6e6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                <FiImage size={40} color="#6b7a99" />
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Button variant="warning">Hapus Laporan</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RiwayatLaporan;