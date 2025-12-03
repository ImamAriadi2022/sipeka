import { useState } from 'react';
import Header from '../../components/user/buatlaporan/Header';
import LocationPicker from '../../components/user/buatlaporan/LocationPicker';
import PhotoUpload from '../../components/user/buatlaporan/PhotoUpload';
import ReportForm from '../../components/user/buatlaporan/ReportForm';
import Sidebar from '../../components/user/buatlaporan/Sidebar';

const BuatLaporan = () => {
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    location: null,
    photos: [],
    category: '',
    priority: 'medium'
  });

  const handleSubmitReport = async (data) => {
    // TODO: Implement report submission
    console.log('Submitting report:', data);
  };

  return (
    <div className="buat-laporan-page">
      <Sidebar />
      <div className="buat-laporan-content">
        <Header title="Buat Laporan Baru" />
        <div className="report-form-container">
          <ReportForm 
            data={reportData} 
            onChange={setReportData}
            onSubmit={handleSubmitReport}
          />
          <div className="report-extras">
            <LocationPicker 
              onLocationSelect={(location) => 
                setReportData(prev => ({...prev, location}))
              } 
            />
            <PhotoUpload 
              photos={reportData.photos}
              onPhotosChange={(photos) => 
                setReportData(prev => ({...prev, photos}))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatLaporan;