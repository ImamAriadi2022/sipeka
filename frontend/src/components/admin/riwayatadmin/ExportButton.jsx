import { useState } from 'react';

const ExportButton = ({ historyData, filters }) => {
  const [isExporting, setIsExporting] = useState(false);

  const formatDataForExport = (data, format) => {
    const processedData = data.map(item => ({
      'Waktu': new Date(item.timestamp).toLocaleString('id-ID'),
      'Jenis Aktivitas': item.actionName,
      'Deskripsi': item.description,
      'Target': item.target || '-',
      'Admin': item.admin,
      'Role Admin': item.adminRole,
      'Status': item.status,
      'IP Address': item.ipAddress || '-',
      'User Agent': item.userAgent || '-'
    }));

    return processedData;
  };

  const exportToCSV = (data) => {
    const processedData = formatDataForExport(data, 'csv');
    
    if (processedData.length === 0) {
      alert('Tidak ada data untuk diekspor');
      return;
    }

    const headers = Object.keys(processedData[0]);
    const csvContent = [
      headers.join(','),
      ...processedData.map(row => 
        headers.map(header => `"${row[header]}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `riwayat-admin-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = (data) => {
    const processedData = formatDataForExport(data, 'json');
    
    if (processedData.length === 0) {
      alert('Tidak ada data untuk diekspor');
      return;
    }

    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: processedData.length,
        filters: filters,
        exportedBy: 'Admin System'
      },
      data: processedData
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `riwayat-admin-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = async (data) => {
    // Simulasi export PDF (dalam implementasi nyata, gunakan library seperti jsPDF)
    alert('Fitur export PDF sedang dalam pengembangan');
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi loading
      
      switch (format) {
        case 'csv':
          exportToCSV(historyData);
          break;
        case 'json':
          exportToJSON(historyData);
          break;
        case 'pdf':
          await exportToPDF(historyData);
          break;
        default:
          throw new Error('Format export tidak didukung');
      }
      
      // Log aktivitas export
      console.log('Data exported:', {
        format,
        recordCount: historyData.length,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Gagal mengekspor data: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="export-section">
      <h4>Export Riwayat</h4>
      <div className="export-options">
        <div className="export-info">
          <span className="export-count">
            📊 {historyData.length} aktivitas siap diekspor
          </span>
          <small className="export-note">
            Data akan diekspor sesuai filter yang aktif
          </small>
        </div>
        
        <div className="export-buttons">
          <button 
            onClick={() => handleExport('csv')}
            disabled={isExporting || historyData.length === 0}
            className="export-btn csv"
            title="Export ke file CSV (Excel compatible)"
          >
            {isExporting ? '⏳' : '📈'} CSV
          </button>
          
          <button 
            onClick={() => handleExport('json')}
            disabled={isExporting || historyData.length === 0}
            className="export-btn json"
            title="Export ke file JSON dengan metadata"
          >
            {isExporting ? '⏳' : '📄'} JSON
          </button>
          
          <button 
            onClick={() => handleExport('pdf')}
            disabled={isExporting || historyData.length === 0}
            className="export-btn pdf"
            title="Export ke file PDF (coming soon)"
          >
            {isExporting ? '⏳' : '📋'} PDF
          </button>
        </div>
        
        {isExporting && (
          <div className="export-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span className="progress-text">Memproses export...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportButton;