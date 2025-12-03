import { useState } from 'react';

const PhotoUpload = ({ photos, onPhotosChange }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    
    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(updatedPhotos);
  };

  return (
    <div className="photo-upload">
      <h3>Foto Pendukung</h3>
      
      <div 
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="file-input"
          id="photo-input"
        />
        <label htmlFor="photo-input" className="upload-label">
          <div className="upload-content">
            <span className="upload-icon">📷</span>
            <p>Klik untuk pilih foto atau drag & drop</p>
            <small>Maksimal 5 foto, ukuran masing-masing maksimal 5MB</small>
          </div>
        </label>
      </div>

      {photos.length > 0 && (
        <div className="photo-preview">
          <h4>Foto Terpilih ({photos.length}/5)</h4>
          <div className="preview-grid">
            {photos.map((photo, index) => (
              <div key={index} className="preview-item">
                <img 
                  src={photo.preview} 
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
                <button 
                  type="button"
                  className="remove-photo"
                  onClick={() => removePhoto(index)}
                >
                  ✕
                </button>
                <div className="photo-info">
                  <small>{photo.name}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;