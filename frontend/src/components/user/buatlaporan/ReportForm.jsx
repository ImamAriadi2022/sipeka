import { Form, InputGroup } from 'react-bootstrap';
import { FiCalendar, FiEdit } from 'react-icons/fi';

const ReportForm = ({ data, onChange, onSubmit }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Jenis Kerusakan */}
      <InputGroup className="mb-2">
        <Form.Control
          type="text"
          placeholder="Kran air tidak hidup"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
        <span className="input-group-text">
          <FiEdit aria-hidden />
        </span>
      </InputGroup>

      {/* Tanggal Pelaporan */}
      <InputGroup className="mb-3">
        <Form.Control
          type="date"
          value={data.date || ''}
          onChange={(e) => handleChange('date', e.target.value)}
          required
        />
        <span className="input-group-text">
          <FiCalendar aria-hidden />
        </span>
      </InputGroup>

      {/* Deskripsi ringkas (opsional) */}
      <Form.Group>
        <Form.Label className="small text-muted">Deskripsi</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Jelaskan detail masalah atau keluhan Anda"
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default ReportForm;