import { useState } from 'react';
import { Card, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import RegisterForm from '../components/auth/register/RegisterForm';
import RegisterHeader from '../components/auth/register/RegisterHeader';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      // Static register: save to localStorage users list
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const exists = users.find(u => u.email === userData.email);
      if (exists) {
        setToast({ show: true, message: 'Email sudah terdaftar', bg: 'danger' });
        return;
      }

      const newUser = {
        fullName: userData.fullName,
        email: userData.email,
        npm: userData.npm,
        password: userData.password,
        role: 'user' // force mahasiswa role on register
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setToast({ show: true, message: 'Registrasi berhasil! Silakan login.', bg: 'success' });
      await new Promise(r => setTimeout(r, 1000));
      window.history.pushState({}, '', '/login');
      window.location.reload();
    } catch (error) {
      console.error('Register error:', error);
      setToast({ show: true, message: 'Terjadi kesalahan saat registrasi', bg: 'danger' });
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