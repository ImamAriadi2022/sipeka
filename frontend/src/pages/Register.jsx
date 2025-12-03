import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import RegisterForm from '../components/auth/register/RegisterForm';
import RegisterHeader from '../components/auth/register/RegisterHeader';

const Register = () => {
  const [loading, setLoading] = useState(false);

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
              <Row className="g-0" key="register-static">
                <Col md={6} className="d-flex align-items-center justify-content-center p-4 panel-animate-left" 
                     style={{ backgroundColor: '#EDF2D7' }}>
                  <RegisterHeader />
                </Col>
                <Col md={6} className="panel-animate-right" style={{ backgroundColor: '#EDF2D7' }}>
                  <div className="p-4">
                    <RegisterForm onSubmit={handleRegister} loading={loading} />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default Register;