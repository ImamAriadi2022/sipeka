import { useState } from 'react';
import { Card, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import RegisterForm from '../components/auth/register/RegisterForm';
import RegisterHeader from '../components/auth/register/RegisterHeader';
import { authAPI } from '../services/api';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        setToast({ 
          show: true, 
          message: 'Registrasi berhasil! Mengalihkan ke dashboard...', 
          bg: 'success' 
        });
        
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        await new Promise(r => setTimeout(r, 1000));
        window.history.pushState({}, '', '/dashboard');
        window.location.reload();
      }
    } catch (error) {
      console.error('Register error:', error);
      const message = error.response?.data?.message || error.response?.data?.errors?.email?.[0] || 'Terjadi kesalahan saat registrasi';
      setToast({ show: true, message, bg: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', paddingTop: '64px' }}
    >
      <div className="w-100" style={{ maxWidth: 1000 }}>
        <Card className="shadow-lg border-0 auth-card"
              style={{ borderRadius: '25px', overflow: 'hidden', backgroundColor: '#EDF2D7' }}>
          <Row className="g-0" key="register-static">
            <Col md={6} className="d-flex align-items-center justify-content-center p-4 panel-animate-left" style={{ backgroundColor: '#EDF2D7' }}>
              <RegisterHeader />
            </Col>
            <Col md={6} className="panel-animate-right" style={{ backgroundColor: '#EDF2D7' }}>
              <div className="p-4">
                <RegisterForm onSubmit={handleRegister} loading={loading} />
              </div>
            </Col>
          </Row>
        </Card>
        <ToastContainer position="top-end" className="p-3">
          <Toast bg={toast.bg} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={1500} autohide>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
};

export default Register;