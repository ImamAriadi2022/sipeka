import { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, ProgressBar } from 'react-bootstrap';
import { FaDownload, FaFileCode, FaFileCsv, FaFilePdf, FaSpinner } from 'react-icons/fa';

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
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <FaDownload className="me-2" />
          Export Riwayat
        </h5>
      </Card.Header>
      <Card.Body>
        <Alert variant="info" className="d-flex align-items-center">
          <div>
            <strong>{(historyData || []).length}</strong> aktivitas siap diekspor
            <br />
            <small>Data akan diekspor sesuai filter yang aktif</small>
          </div>
        </Alert>
        
        <ButtonGroup className="w-100 mb-3">
          <Button 
            variant="outline-success"
            onClick={() => handleExport('csv')}
            disabled={isExporting || (historyData || []).length === 0}
            title="Export ke file CSV (Excel compatible)"
          >
            {isExporting ? <FaSpinner className="fa-spin me-1" /> : <FaFileCsv className="me-1" />}
            CSV
          </Button>
          
          <Button 
            variant="outline-primary"
            onClick={() => handleExport('json')}
            disabled={isExporting || (historyData || []).length === 0}
            title="Export ke file JSON dengan metadata"
          >
            {isExporting ? <FaSpinner className="fa-spin me-1" /> : <FaFileCode className="me-1" />}
            JSON
          </Button>
          
          <Button 
            variant="outline-danger"
            onClick={() => handleExport('pdf')}
            disabled={isExporting || (historyData || []).length === 0}
            title="Export ke file PDF (coming soon)"
          >
            {isExporting ? <FaSpinner className="fa-spin me-1" /> : <FaFilePdf className="me-1" />}
            PDF
          </Button>
        </ButtonGroup>
        
        {isExporting && (
          <div>
            <ProgressBar animated now={100} className="mb-2" />
            <small className="text-muted">Memproses export...</small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExportButton;