import { Button, Form, InputGroup } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';

const LocationPicker = ({ onLocationSelect }) => {
  const handleManualChange = (e) => {
    const address = e.target.value;
    onLocationSelect(address);
  };

  return (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Kamar Mandi lantai 1 gedung H Teknik Elektro"
        onChange={handleManualChange}
      />
          <Button variant="light" title="Edit lokasi">
            <FiEdit aria-hidden />
          </Button>
    </InputGroup>
  );
};

export default LocationPicker;