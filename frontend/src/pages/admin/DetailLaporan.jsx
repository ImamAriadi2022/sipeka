import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../components/halamandetaillaporanadmin/AdminHeader';
import AdminSidebar from '../components/halamandetaillaporanadmin/AdminSidebar';
import ReportActions from '../components/halamandetaillaporanadmin/ReportActions';
import ReportComments from '../components/halamandetaillaporanadmin/ReportComments';
import ReportDetailCard from '../components/halamandetaillaporanadmin/ReportDetailCard';
import ReportLocation from '../components/halamandetaillaporanadmin/ReportLocation';
import ReportPhotos from '../components/halamandetaillaporanadmin/ReportPhotos';

const HalamanDetailLaporanAdmin = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch report detail
    const fetchReportDetail = async () => {
      setLoading(true);
      try {
        // Implement API call
        // const reportData = await api.getReportDetail(reportId);
        // setReport(reportData);
      } catch (error) {
        console.error('Error fetching report detail:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (reportId) {
      fetchReportDetail();
    }
  }, [reportId]);

  const handleStatusUpdate = async (newStatus) => {
    // TODO: Update report status
    console.log('Updating report status:', reportId, newStatus);
  };

  const handleAddComment = async (comment) => {
    // TODO: Add comment to report
    console.log('Adding comment:', comment);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="halaman-detail-laporan-admin-page">
      <AdminSidebar />
      <div className="halaman-detail-laporan-admin-content">
        <AdminHeader title="Detail Laporan" />
        <div className="report-detail-container">
          <ReportDetailCard report={report} />
          <div className="report-media">
            <ReportPhotos photos={report?.photos || []} />
            <ReportLocation location={report?.location} />
          </div>
          <ReportActions 
            report={report}
            onStatusUpdate={handleStatusUpdate}
          />
          <ReportComments 
            reportId={reportId}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default HalamanDetailLaporanAdmin;