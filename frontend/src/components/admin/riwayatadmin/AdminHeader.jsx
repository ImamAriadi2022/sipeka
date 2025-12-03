import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { FaBell, FaSync, FaUser } from 'react-icons/fa';

const AdminHeader = ({ title }) => {
  return (
    <Container fluid className="bg-light border-bottom py-3">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-1 text-dark">{title}</h2>
          <p className="text-muted mb-0">
            Monitor dan analisis seluruh aktivitas admin dalam sistem
          </p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center gap-3">
          <Button 
            variant="outline-primary"
            size="sm"
            title="Refresh Data"
            onClick={() => window.location.reload()}
          >
            <FaSync className="me-1" />
            Refresh
          </Button>
          
          <div className="position-relative">
            <Button variant="outline-secondary" size="sm">
              <FaBell />
            </Button>
            <Badge 
              bg="danger" 
              pill 
              className="position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: '0.6em' }}
            >
              2
            </Badge>
          </div>
          
          <div className="d-flex align-items-center">
            <div className="me-2 text-end">
              <div className="small fw-bold">Admin User</div>
              <div className="small text-muted">Administrator</div>
            </div>
            <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <FaUser className="text-white" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHeader;