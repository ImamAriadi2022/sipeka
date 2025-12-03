import { useState } from 'react';

const ReportLocation = ({ location }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Mock location data if not provided
  const locationData = location || {
    address: 'Taman Kota Utara, Jl. Merdeka No. 45, Kelurahan ABC, Jakarta Pusat',
    coordinates: {
      latitude: -6.2088,
      longitude: 106.8456
    },
    landmarks: ['Dekat Kantor Kelurahan', 'Seberang Bank ABC'],
    district: 'Jakarta Pusat',
    subDistrict: 'Kelurahan ABC',
    rtRw: 'RT 05/RW 03'
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
    setMapError(false);
  };

  const handleMapError = () => {
    setMapError(true);
    setIsMapLoaded(false);
  };

  const openInGoogleMaps = () => {
    const { latitude, longitude } = locationData.coordinates;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const openInWaze = () => {
    const { latitude, longitude } = locationData.coordinates;
    const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    window.open(url, '_blank');
  };

  const copyCoordinates = () => {
    const { latitude, longitude } = locationData.coordinates;
    const coordText = `${latitude}, ${longitude}`;
    navigator.clipboard.writeText(coordText).then(() => {
      alert('Koordinat berhasil disalin!');
    }).catch(() => {
      alert('Gagal menyalin koordinat');
    });
  };

  return (
    <div className="report-location">
      <h3>Lokasi Laporan</h3>
      
      <div className="location-content">
        {/* Address Information */}
        <div className="location-info">
          <div className="address-section">
            <h4>📍 Alamat Lengkap</h4>
            <p className="full-address">{locationData.address}</p>
          </div>

          <div className="location-details">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">🏛️ Kecamatan</span>
                <span className="detail-value">{locationData.district}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🏘️ Kelurahan</span>
                <span className="detail-value">{locationData.subDistrict}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🏠 RT/RW</span>
                <span className="detail-value">{locationData.rtRw}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🌐 Koordinat</span>
                <span className="detail-value coordinates" onClick={copyCoordinates} title="Klik untuk copy">
                  {locationData.coordinates.latitude}, {locationData.coordinates.longitude}
                  <span className="copy-icon">📋</span>
                </span>
              </div>
            </div>
          </div>

          {/* Landmarks */}
          {locationData.landmarks && locationData.landmarks.length > 0 && (
            <div className="landmarks-section">
              <h4>🏢 Patokan Terdekat</h4>
              <ul className="landmarks-list">
                {locationData.landmarks.map((landmark, index) => (
                  <li key={index} className="landmark-item">
                    📍 {landmark}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="map-section">
          <div className="map-header">
            <h4>🗺️ Peta Lokasi</h4>
            <div className="map-actions">
              <button 
                onClick={openInGoogleMaps}
                className="map-action-btn google-maps"
                title="Buka di Google Maps"
              >
                🌐 Google Maps
              </button>
              <button 
                onClick={openInWaze}
                className="map-action-btn waze"
                title="Buka di Waze"
              >
                🚗 Waze
              </button>
              <button 
                onClick={copyCoordinates}
                className="map-action-btn copy-coords"
                title="Salin koordinat"
              >
                📋 Copy Koordinat
              </button>
            </div>
          </div>

          <div className="map-container">
            {!mapError ? (
              <div className="map-wrapper">
                {!isMapLoaded && (
                  <div className="map-loading">
                    <div className="loading-spinner"></div>
                    <p>Memuat peta...</p>
                  </div>
                )}
                
                {/* Embed Google Maps */}
                <iframe
                  className={`map-iframe ${isMapLoaded ? 'loaded' : ''}`}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${locationData.coordinates.latitude},${locationData.coordinates.longitude}&zoom=16`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={handleMapLoad}
                  onError={handleMapError}
                />
              </div>
            ) : (
              <div className="map-error">
                <div className="error-content">
                  <span className="error-icon">🗺️</span>
                  <h4>Tidak dapat memuat peta</h4>
                  <p>Peta tidak dapat ditampilkan saat ini</p>
                  <div className="error-actions">
                    <button 
                      onClick={() => {
                        setMapError(false);
                        setIsMapLoaded(false);
                      }}
                      className="retry-btn"
                    >
                      🔄 Coba Lagi
                    </button>
                    <button 
                      onClick={openInGoogleMaps}
                      className="external-map-btn"
                    >
                      🌐 Buka di Google Maps
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location Navigation */}
        <div className="location-navigation">
          <h4>🧭 Navigasi & Petunjuk</h4>
          <div className="navigation-options">
            <div className="navigation-item">
              <span className="nav-icon">🚶</span>
              <div className="nav-info">
                <strong>Akses Pejalan Kaki</strong>
                <p>Dapat diakses dengan berjalan kaki dari halte bus terdekat (200m)</p>
              </div>
            </div>
            
            <div className="navigation-item">
              <span className="nav-icon">🚗</span>
              <div className="nav-info">
                <strong>Akses Kendaraan</strong>
                <p>Parkir tersedia di area taman kota. Akses melalui Jl. Merdeka</p>
              </div>
            </div>
            
            <div className="navigation-item">
              <span className="nav-icon">🚌</span>
              <div className="nav-info">
                <strong>Transportasi Umum</strong>
                <p>Halte bus ABC (200m), Stasiun KRL Merdeka (500m)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLocation;