import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AdminHeader from '../../components/admin/detaillaporan/AdminHeader';
import AdminSidebar from '../../components/admin/detaillaporan/AdminSidebar';
import ReportActions from '../../components/admin/detaillaporan/ReportActions';
import ReportComments from '../../components/admin/detaillaporan/ReportComments';
import ReportDetailCard from '../../components/admin/detaillaporan/ReportDetailCard';
import ReportLocation from '../../components/admin/detaillaporan/ReportLocation';
import ReportPhotos from '../../components/admin/detaillaporan/ReportPhotos';

const HalamanDetailLaporanAdmin = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch report detail
    const fetchReportDetail = async () => {
      setLoading(true);
      try {
        // Mock data for demonstration
        setTimeout(() => {
          setReport({
            id: reportId || 'RPT-001',
            title: 'Kerusakan Fasilitas Umum di Taman Kota',
            status: 'pending'
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching report detail:', error);
        setLoading(false);
      }
    };
    
    if (reportId) {
      fetchReportDetail();
    }
  }, [reportId]);

  const handleStatusUpdate = async (newStatus) => {
    console.log('Updating report status:', reportId, newStatus);
  };

  const handleAddComment = async (comment) => {
    console.log('Adding comment:', comment);
  };

  if (loading) {
    return (
      <div className="d-flex">
        <AdminSidebar />
        <div className="flex-grow-1">
          <AdminHeader title="Detail Laporan" />
          <Container fluid className="py-5 text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Memuat detail laporan...</p>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Detail Laporan" />
        <Container fluid className="py-4">
          <Row>
            <Col lg={8}>
              <ReportDetailCard report={report} />
              <ReportComments 
                reportId={reportId}
                onAddComment={handleAddComment}
              />
            </Col>
            <Col lg={4}>
              <ReportActions 
                report={report}
                onStatusUpdate={handleStatusUpdate}
              />
              <ReportPhotos photos={report?.photos || []} />
              <ReportLocation location={report?.location} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HalamanDetailLaporanAdmin;