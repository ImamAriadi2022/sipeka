import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import LoginForm from '../components/auth/login/LoginForm';
import LoginHeader from '../components/auth/login/LoginHeader';
import RegisterForm from '../components/auth/register/RegisterForm';
import RegisterHeader from '../components/auth/register/RegisterHeader';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      // TODO: Implement login logic
      console.log('Login credentials:', credentials);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Login error:', error);
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
          </Col>
        </Row>
      </Container>
  );
};

export default Login;