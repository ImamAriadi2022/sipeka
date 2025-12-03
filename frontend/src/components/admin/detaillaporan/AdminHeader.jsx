
import { Breadcrumb, Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaClipboardList, FaEye, FaHome, FaSync } from 'react-icons/fa';

const AdminHeader = ({ title = "Detail Laporan" }) => {
  return (
    <Container fluid className="bg-light border-bottom py-3">
      <Row className="align-items-center">
        <Col>
          <h2 className="mb-2 text-dark">{title}</h2>
          <Breadcrumb className="mb-0">
            <Breadcrumb.Item>
              <FaHome className="me-1" />
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <FaClipboardList className="me-1" />
              Kelola Laporan
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              <FaEye className="me-1" />
              Detail Laporan
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs="auto">
          <ButtonGroup>
            <Button 
              variant="outline-primary"
              onClick={() => window.location.reload()}
              title="Refresh halaman"
            >
              <FaSync className="me-1" />
              Refresh
            </Button>
            <Button 
              variant="outline-secondary"
              onClick={() => window.history.back()}
              title="Kembali ke daftar laporan"
            >
              <FaArrowLeft className="me-1" />
              Kembali
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHeader;