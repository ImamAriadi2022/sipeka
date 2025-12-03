import { useState } from 'react';
import { Card, Col, Container, Row, Toast, ToastContainer } from 'react-bootstrap';
import LoginForm from '../components/auth/login/LoginForm';
import LoginHeader from '../components/auth/login/LoginHeader';
import RegisterForm from '../components/auth/register/RegisterForm';
import RegisterHeader from '../components/auth/register/RegisterHeader';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      // Seed demo users if none
      const existing = JSON.parse(localStorage.getItem('users') || '[]');
      if (!existing.length) {
        const seed = [
          { fullName: 'Admin Demo', email: 'admin@example.com', npm: '-', password: 'admin123', role: 'admin' },
          { fullName: 'User Demo', email: 'user@example.com', npm: '123456789', password: 'user123', role: 'user' },
        ];
        localStorage.setItem('users', JSON.stringify(seed));
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const match = users.find(u => u.email === credentials.email && u.password === credentials.password);

      if (!match) {
        setToast({ show: true, message: 'Email atau password salah', bg: 'danger' });
        return;
      }

      // Set auth token + role
      localStorage.setItem('authToken', 'static-demo-token');
      localStorage.setItem('userRole', match.role || 'user');
      localStorage.setItem('currentUser', JSON.stringify(match));

      setToast({ show: true, message: `Login berhasil sebagai ${match.role === 'admin' ? 'Admin' : 'Mahasiswa'}`, bg: 'success' });

      // Navigate to role dashboard after short delay
      const target = match.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      await new Promise(r => setTimeout(r, 800));
      window.history.pushState({}, '', target);
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      setToast({ show: true, message: 'Terjadi kesalahan saat login', bg: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      // TODO: Implement register logic
      console.log('Register data:', userData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Card className="shadow-lg border-0 auth-card" 
                  style={{ 
                    borderRadius: '25px', 
                    overflow: 'hidden',
                    maxWidth: '1000px',
                    maxHeight: '500px',
                    backgroundColor: '#EDF2D7',
                    margin: '0 auto'
                  }}>
              {!isRegisterMode ? (
                // Login Layout
                <Row className="g-0" key="login-layout">
                  <Col md={7} className="panel-animate-left" style={{ backgroundColor: '#EDF2D7' }}>
                    <div className="p-4">
                      <LoginForm 
                        onSubmit={handleLogin} 
                        loading={loading}
                        onToggleMode={toggleMode}
                      />
                    </div>
                  </Col>
                  <Col md={5} className="d-flex align-items-center justify-content-center p-4 panel-animate-right" 
                       style={{ backgroundColor: '#EDF2D7' }}>
                    <LoginHeader />
                  </Col>
                </Row>
              ) : (
                // Register Layout
                <Row className="g-0" key="register-layout">
                  <Col md={6} className="d-flex align-items-center justify-content-center p-4 panel-animate-left" 
                       style={{ backgroundColor: '#EDF2D7' }}>
                    <RegisterHeader />
                  </Col>
                  <Col md={6} className="panel-animate-right" style={{ backgroundColor: '#EDF2D7' }}>
                    <div className="p-4">
                      <RegisterForm 
                        onSubmit={handleRegister} 
                        loading={loading}
                        onToggleMode={toggleMode}
                      />
                    </div>
                  </Col>
                </Row>
              )}
            </Card>
            {/* Toast Feedback */}
            <ToastContainer position="top-end" className="p-3">
              <Toast bg={toast.bg} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={1500} autohide>
                <Toast.Body className="text-white">{toast.message}</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>
  );
};

export default Login;