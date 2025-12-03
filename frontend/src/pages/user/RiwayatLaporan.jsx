import { useEffect, useState } from 'react';
import Header from '../../components/user/riwayatlaporan/Header';
import ReportCard from '../../components/user/riwayatlaporan/ReportCard';
import ReportFilters from '../../components/user/riwayatlaporan/ReportFilters';
import ReportList from '../../components/user/riwayatlaporan/ReportList';
import Sidebar from '../../components/user/riwayatlaporan/Sidebar';

const RiwayatLaporan = () => {
  const [userReports, setUserReports] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    category: 'all'
  });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'

  useEffect(() => {
    // TODO: Fetch user's reports history
    const fetchUserReports = async () => {
      // Implement API call
    };
    fetchUserReports();
  }, [filters]);

  const handleReportClick = (reportId) => {
    // TODO: Navigate to report detail
    console.log('Viewing report:', reportId);
  };

  return (
    <div className="riwayat-laporan-page">
      <Sidebar />
      <div className="riwayat-laporan-content">
        <Header title="Riwayat Laporan Saya" />
        <div className="riwayat-controls">
          <ReportFilters filters={filters} onFiltersChange={setFilters} />
          <div className="view-toggle">
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button 
              className={viewMode === 'card' ? 'active' : ''}
              onClick={() => setViewMode('card')}
            >
              Card View
            </button>
          </div>
        </div>
        <div className="reports-container">
          {viewMode === 'list' ? (
            <ReportList 
              reports={userReports} 
              onReportClick={handleReportClick}
            />
          ) : (
            <div className="reports-grid">
              {userReports.map(report => (
                <ReportCard 
                  key={report.id}
                  report={report}
                  onClick={() => handleReportClick(report.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiwayatLaporan;