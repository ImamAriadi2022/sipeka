import { useState } from 'react';

const ReportPhotos = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock photos data if not provided
  const photosData = photos && photos.length > 0 ? photos : [
    {
      id: 1,
      url: '/api/placeholder/400/300',
      caption: 'Kondisi bangku taman yang rusak',
      timestamp: '2024-01-15T08:30:00Z',
      uploadedBy: 'Pelapor'
    },
    {
      id: 2,
      url: '/api/placeholder/400/300',
      caption: 'Lampu penerangan yang tidak menyala',
      timestamp: '2024-01-15T08:32:00Z',
      uploadedBy: 'Pelapor'
    },
    {
      id: 3,
      url: '/api/placeholder/400/300',
      caption: 'Kondisi keseluruhan area yang bermasalah',
      timestamp: '2024-01-15T08:35:00Z',
      uploadedBy: 'Pelapor'
    }
  ];

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadPhoto = (photo) => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `sipeka-foto-${photo.id}-${Date.now()}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sharePhoto = (photo) => {
    if (navigator.share) {
      navigator.share({
        title: 'Foto Laporan SIPEKA',
        text: photo.caption,
        url: photo.url,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(photo.url).then(() => {
        alert('URL foto berhasil disalin!');
      }).catch(() => {
        alert('Gagal menyalin URL foto');
      });
    }
  };

  if (!photosData || photosData.length === 0) {
    return (
      <div className="report-photos">
        <h3>📷 Foto Laporan</h3>
        <div className="no-photos">
          <span className="no-photos-icon">📷</span>
          <h4>Tidak ada foto</h4>
          <p>Laporan ini tidak disertai dengan foto</p>
        </div>
      </div>
    );
  }

  return (
    <div className="report-photos">
      <h3>📷 Foto Laporan ({photosData.length})</h3>
      
      <div className="photos-content">
        {/* Photos Grid */}
        <div className="photos-grid">
          {photosData.map((photo, index) => (
            <div key={photo.id} className="photo-item">
              <div className="photo-wrapper" onClick={() => openPhotoModal(photo)}>
                <img 
                  src={photo.url} 
                  alt={photo.caption || `Foto ${index + 1}`}
                  className="photo-thumbnail"
                  loading="lazy"
                />
                <div className="photo-overlay">
                  <button className="view-btn" title="Lihat foto">
                    👁️ Lihat
                  </button>
                </div>
              </div>
              
              <div className="photo-info">
                <p className="photo-caption">
                  {photo.caption || `Foto ${index + 1}`}
                </p>
                <div className="photo-meta">
                  <span className="photo-timestamp">
                    📅 {formatDateTime(photo.timestamp)}
                  </span>
                  <span className="photo-uploader">
                    👤 {photo.uploadedBy}
                  </span>
                </div>
                
                <div className="photo-actions">
                  <button 
                    onClick={() => downloadPhoto(photo)}
                    className="photo-action-btn download"
                    title="Download foto"
                  >
                    💾
                  </button>
                  <button 
                    onClick={() => sharePhoto(photo)}
                    className="photo-action-btn share"
                    title="Bagikan foto"
                  >
                    📤
                  </button>
                  <button 
                    onClick={() => openPhotoModal(photo)}
                    className="photo-action-btn view"
                    title="Lihat detail"
                  >
                    🔍
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Upload Section (for admin to add more photos) */}
        <div className="photo-upload-section">
          <h4>Tambah Foto</h4>
          <div className="upload-area">
            <input 
              type="file" 
              id="photo-upload"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                // TODO: Handle photo upload
                console.log('Files selected:', e.target.files);
                alert('Fitur upload foto akan segera tersedia');
              }}
            />
            <label htmlFor="photo-upload" className="upload-btn">
              📷 Tambah Foto Tambahan
            </label>
            <small className="upload-note">
              Upload foto tambahan untuk dokumentasi penanganan
            </small>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {isModalOpen && selectedPhoto && (
        <div className="photo-modal" onClick={closePhotoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Detail Foto</h4>
              <button 
                onClick={closePhotoModal}
                className="close-modal-btn"
                title="Tutup"
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-wrapper">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption}
                  className="modal-image"
                />
              </div>
              
              <div className="modal-info">
                <h5>{selectedPhoto.caption}</h5>
                <div className="modal-meta">
                  <div className="meta-item">
                    <span className="meta-label">📅 Waktu Upload:</span>
                    <span className="meta-value">{formatDateTime(selectedPhoto.timestamp)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">👤 Diupload oleh:</span>
                    <span className="meta-value">{selectedPhoto.uploadedBy}</span>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    onClick={() => downloadPhoto(selectedPhoto)}
                    className="modal-action-btn download"
                  >
                    💾 Download
                  </button>
                  <button 
                    onClick={() => sharePhoto(selectedPhoto)}
                    className="modal-action-btn share"
                  >
                    📤 Bagikan
                  </button>
                  <button 
                    onClick={() => {
                      // TODO: Implement edit functionality
                      alert('Fitur edit caption akan segera tersedia');
                    }}
                    className="modal-action-btn edit"
                  >
                    ✏️ Edit Caption
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPhotos;