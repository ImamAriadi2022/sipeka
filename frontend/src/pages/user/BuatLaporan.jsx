import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from '../../components/user/buatlaporan/Header';
import LocationPicker from '../../components/user/buatlaporan/LocationPicker';
import PhotoUpload from '../../components/user/buatlaporan/PhotoUpload';
import ReportForm from '../../components/user/buatlaporan/ReportForm';
import { reportsAPI } from '../../services/api';

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

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('location', data.location);
      formData.append('category', data.category || 'Lainnya');
      formData.append('date', data.date);
      
      // Add photos if any
      if (Array.isArray(data.photos) && data.photos.length > 0) {
        data.photos.forEach((photo, index) => {
          if (photo instanceof File) {
            formData.append('photos[]', photo);
          }
        });
      }

      const response = await reportsAPI.create(formData);
      
      if (response.data.success) {
        setShowSuccess(true);
        // Reset form fields after success
        setReportData({
          title: '',
          description: '',
          location: null,
          photos: [],
          category: '',
          priority: 'medium',
          date: ''
        });
      }
    } catch (error) {
      console.error('Submit report error:', error);
      setErrorMsg(error.response?.data?.message || 'Terjadi kesalahan saat membuat laporan');
    }
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