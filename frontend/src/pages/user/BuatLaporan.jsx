import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from '../../components/user/buatlaporan/Header';
import LocationPicker from '../../components/user/buatlaporan/LocationPicker';
import PhotoUpload from '../../components/user/buatlaporan/PhotoUpload';
import ReportForm from '../../components/user/buatlaporan/ReportForm';

const BuatLaporan = () => {
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    location: null,
    photos: [],
    category: '',
    priority: 'medium',
    date: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitReport = async (data) => {
    setErrorMsg('');
    // Basic validation matching required figma fields
    if (!data.location || !data.title || !data.date) {
      setErrorMsg('Lengkapi lokasi, jenis kerusakan, dan tanggal.');
      return;
    }

    const email = JSON.parse(localStorage.getItem('currentUser') || 'null')?.email || 'keysha@gmail.com';
    const existing = JSON.parse(localStorage.getItem('reports') || '[]');
    const newReport = {
      id: Date.now(),
      userEmail: email,
      location: data.location,
      title: data.title,
      date: data.date,
      description: data.description || '',
      status: 'Menunggu',
      photosCount: Array.isArray(data.photos) ? data.photos.length : 0,
    };
    localStorage.setItem('reports', JSON.stringify([newReport, ...existing]));
    setShowSuccess(true);
    // Optional: reset form fields after success
    setReportData({
      title: '',
      description: '',
      location: null,
      photos: [],
      category: '',
      priority: 'medium',
      date: ''
    });
  };

  return (
    <>
      {/* Page Title */}
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Laporan Kerusakan</h5>

      {/* Centered Card Container matching the design */}
      <div className="mx-auto" style={{
        maxWidth: '900px',
        minHeight: '420px',
        backgroundColor: '#f3f6fb',
        borderRadius: '10px',
        border: '4px solid #2b5cab',
        padding: '18px'
      }}>
        {/* Inner content spacing */}
        <div className="mx-auto" style={{ maxWidth: '820px' }}>
          {/* Sections via components */}
          <div className="mb-3">
            <Header title="Lokasi Kerusakan" />
            <LocationPicker
              onLocationSelect={(location) =>
                setReportData((prev) => ({ ...prev, location }))
              }
            />
          </div>

          <div className="mb-3">
            <Header title="Jenis Kerusakan" />
            <ReportForm
              data={reportData}
              onChange={setReportData}
              onSubmit={handleSubmitReport}
            />
          </div>

          <div className="mb-3">
            <Header title="Lampiran Sanggahan" />
            <PhotoUpload
              photos={reportData.photos}
              onPhotosChange={(photos) =>
                setReportData((prev) => ({ ...prev, photos }))
              }
            />
          </div>

          {/* Inline error (if any) */}
          {errorMsg && (
            <div className="alert alert-danger py-2" role="alert">{errorMsg}</div>
          )}

          {/* Action buttons aligned like the mockup */}
          <div className="d-flex gap-3 justify-content-end mt-4">
            <Button variant="danger" onClick={() => window.history.back()}>Batal</Button>
            <Button variant="primary" onClick={() => handleSubmitReport(reportData)}>Buat Laporan</Button>
          </div>
        </div>
      </div>

      {/* Success modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Laporan berhasil dibuat.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccess(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuatLaporan;