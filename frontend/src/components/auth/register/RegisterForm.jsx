import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = ({ onSubmit, loading, onToggleMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    npm: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.npm || !formData.password) {
      setError('Semua field wajib diisi');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    
    // Pass formData to parent
    onSubmit(formData);
  };

  return (
    <div style={{
           width: '300px',
           border: '2px solid #007bff',
           borderRadius: '15px',
           padding: '15px',
           backgroundColor: '#ffffff'
         }}>
      {/* Header */}
      <div className="text-center mb-2">
        <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '14px' }}>Please Fill this form to create an Account</h5>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="py-2 small">
          {error}
        </Alert>
      )}

      {/* Register Form */}
      <Form onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <Form.Group className="mb-1">
          <Form.Label className="text-primary fw-semibold mb-0" style={{ fontSize: '12px' }}>Full Name <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder=""
            className="py-1"
            style={{ 
              borderRadius: '6px',
              border: '2px solid #ced4da',
              fontSize: '13px'
            }}
            required
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-1">
          <Form.Label className="text-primary fw-semibold mb-0" style={{ fontSize: '12px' }}>Email Address <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            className="py-1"
            style={{ 
              borderRadius: '6px',
              border: '2px solid #ced4da',
              fontSize: '13px'
            }}
            required
          />
        </Form.Group>

        {/* NPM Field */}
        <Form.Group className="mb-1">
          <Form.Label className="text-primary fw-semibold mb-0" style={{ fontSize: '12px' }}>NPM <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="npm"
            value={formData.npm}
            onChange={handleChange}
            placeholder=""
            className="py-1"
            style={{ 
              borderRadius: '6px',
              border: '2px solid #ced4da',
              fontSize: '13px'
            }}
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-1">
          <Form.Label className="text-primary fw-semibold mb-0" style={{ fontSize: '12px' }}>Password <span className="text-danger">*</span></Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••••••"
              className="py-1 pe-5"
              style={{ 
                borderRadius: '6px',
                border: '2px solid #ced4da',
                fontSize: '13px'
              }}
              required
            />
            <Button
              variant="link"
              className="position-absolute end-0 top-50 translate-middle-y me-2 p-0"
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                border: 'none',
                background: 'none',
                zIndex: 5
              }}
            >
              {showPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-primary" />}
            </Button>
          </div>
        </Form.Group>

        {/* Role is implicitly Mahasiswa (user); no manual selection */}

        {/* Sign Up Button */}
        <Button 
          type="submit" 
          className="w-100 py-2 fw-bold text-white mb-1 mt-2"
          style={{ 
            backgroundColor: '#007bff',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px'
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Signing up...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-muted" style={{ fontSize: '12px' }}>Already have an account? </span>
          <Button 
            variant="link" 
            className="p-0 text-primary text-decoration-none fw-bold"
            style={{ fontSize: '12px' }}
            onClick={() => {
              window.history.pushState({}, '', '/login');
              window.location.reload();
            }}
          >
            LOGIN
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;