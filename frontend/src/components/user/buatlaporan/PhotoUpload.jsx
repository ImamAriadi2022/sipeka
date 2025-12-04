import { Button, InputGroup } from 'react-bootstrap';
import { FiUpload } from 'react-icons/fi';

const PhotoUpload = ({ photos, onPhotosChange }) => {
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    onPhotosChange(files);
  };

  return (
    <div>
      <div className="small text-muted mb-2">
        • Format PNG/JPG
        <br />• Ukuran maksimum 5 MB
      </div>
          <InputGroup>
            <Button as="label" htmlFor="file-input" variant="primary">
              <FiUpload aria-hidden />
              <span style={{ marginLeft: 8 }}>Pilih File</span>
            </Button>
        <input
          id="file-input"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="d-none"
          onChange={handleFileSelect}
        />
      </InputGroup>
      <div className="small text-muted mt-1">
        {photos && photos.length > 0 ? `${photos.length} file dipilih` : 'Belum ada file dipilih'}
      </div>
    </div>
  );
};

export default PhotoUpload;