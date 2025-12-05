import { useState } from 'react';
import { Card, Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import LoginForm from '../components/auth/login/LoginForm';
import LoginHeader from '../components/auth/login/LoginHeader';
import RegisterForm from '../components/auth/register/RegisterForm';
import RegisterHeader from '../components/auth/register/RegisterHeader';
import { authAPI } from '../services/api';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.login(credentials.email, credentials.password);
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Save token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('currentUser', JSON.stringify(user));

        setToast({
          show: true,
          message: `Login berhasil sebagai ${user.role === 'admin' ? 'Admin' : 'Mahasiswa'}`,
          bg: 'success',
        });

        const target = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        await new Promise((r) => setTimeout(r, 800));
        window.history.pushState({}, '', target);
        window.location.reload();
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Email atau password salah';
      setToast({ show: true, message, bg: 'danger' });
    } finally {
      setLoading(false);
    }
  };

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
        
        await new Promise((r) => setTimeout(r, 1000));
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

  const toggleMode = () => setIsRegisterMode(!isRegisterMode);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDF2D7' }}>
      <Card
        className="border-0"
        style={{
          minHeight: '100vh',
          borderRadius: 0,
          backgroundColor: '#EDF2D7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 690 }}>
          {!isRegisterMode ? (
            <Row className="g-0" key="login-layout">
              <Col
                md={7}
                className="panel-animate-left"
                style={{ backgroundColor: '#EDF2D7' }}
              >
                <div className="p-4">
                  <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    onToggleMode={toggleMode}
                  />
                </div>
              </Col>
              <Col
                md={5}
                className="d-flex align-items-center justify-content-center p-4 panel-animate-right"
                style={{ backgroundColor: '#EDF2D7' }}
              >
                <LoginHeader />
              </Col>
            </Row>
          ) : (
            <Row className="g-0" key="register-layout">
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center p-4 panel-animate-left"
                style={{ backgroundColor: '#EDF2D7' }}
              >
                <RegisterHeader />
              </Col>
              <Col
                md={6}
                className="panel-animate-right"
                style={{ backgroundColor: '#EDF2D7' }}
              >
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
  
          <ToastContainer position="top-end" className="p-3">
            <Toast
              bg={toast.bg}
              onClose={() => setToast({ ...toast, show: false })}
              show={toast.show}
              delay={1500}
              autohide
            >
              <Toast.Body className="text-white">{toast.message}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </Card>
    </div>
  );
};

export default Login;