import { useState } from 'react';

const LocationPicker = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPickingLocation, setIsPickingLocation] = useState(false);

  const handleLocationPick = () => {
    setIsPickingLocation(true);
    // TODO: Integrate with maps API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Loading address...' // TODO: Reverse geocoding
          };
          setSelectedLocation(location);
          onLocationSelect(location);
          setIsPickingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsPickingLocation(false);
        }
      );
    }
  };

  return (
    <div className="location-picker">
      <h3>Lokasi Kejadian</h3>
      
      <div className="location-controls">
        <button 
          type="button"
          className="btn-location"
          onClick={handleLocationPick}
          disabled={isPickingLocation}
        >
          {isPickingLocation ? 'Mengambil Lokasi...' : '📍 Ambil Lokasi Saat Ini'}
        </button>
      </div>

      {selectedLocation && (
        <div className="selected-location">
          <h4>Lokasi Terpilih:</h4>
          <p>📍 {selectedLocation.address}</p>
          <small>
            Lat: {selectedLocation.latitude}, 
            Lng: {selectedLocation.longitude}
          </small>
        </div>
      )}

      <div className="location-map">
        {/* TODO: Integrate map component */}
        <div className="map-placeholder">
          <p>🗺️ Peta akan ditampilkan di sini</p>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;