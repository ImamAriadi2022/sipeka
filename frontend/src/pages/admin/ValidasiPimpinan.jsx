import { useEffect, useState } from 'react';
import AdminHeader from '../../components/admin/validasipimpinan/AdminHeader';
import AdminSidebar from '../../components/admin/validasipimpinan/AdminSidebar';
import ValidasiFilters from '../../components/admin/validasipimpinan/ValidasiFilters';
import ValidasiForm from '../../components/admin/validasipimpinan/ValidasiForm';
import ValidasiStats from '../../components/admin/validasipimpinan/ValidasiStats';
import ValidasiTable from '../../components/admin/validasipimpinan/ValidasiTable';

const ValidasiPimpinan = () => {
  const [laporanData, setLaporanData] = useState([]);
  const [filters, setFilters] = useState({
    status: 'menunggu-validasi', // menunggu-validasi, disetujui, ditolak, all
    dateRange: 'all',
    search: ''
  });
  const [showValidasiForm, setShowValidasiForm] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [stats, setStats] = useState({
    menungguValidasi: 0,
    disetujui: 0,
    ditolak: 0,
    total: 0
  });

  useEffect(() => {
    // TODO: Fetch laporan yang perlu validasi pimpinan
    const fetchLaporanValidasi = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = [
          {
            id: 'RPT001',
            judul: 'Renovasi Gedung Perpustakaan',
            kategori: 'Infrastruktur',
            pelapor: 'Ahmad Fauzi',
            nim: '12345678',
            tanggalLaporan: '2025-11-28',
            statusValidasiPimpinan: 'menunggu-validasi',
            prioritas: 'tinggi',
            estimasiBiaya: 50000000,
            deskripsi: 'Perlu renovasi atap gedung perpustakaan yang bocor'
          },
          {
            id: 'RPT002',
            judul: 'Pengadaan Proyektor Kelas',
            kategori: 'Sarana Prasarana',
            pelapor: 'Siti Nurhaliza',
            nim: '87654321',
            tanggalLaporan: '2025-11-27',
            statusValidasiPimpinan: 'disetujui',
            prioritas: 'sedang',
            estimasiBiaya: 15000000,
            deskripsi: 'Proyektor di kelas 3A rusak dan perlu diganti',
            validasiPimpinan: {
              status: 'disetujui',
              tanggalValidasi: '2025-11-30',
              catatan: 'Disetujui dengan anggaran maksimal 15 juta',
              validatorName: 'Dr. Budi Santoso, M.Si.'
            }
          }
        ];
        setLaporanData(mockData);
        
        // Calculate stats
        const menunggu = mockData.filter(l => l.statusValidasiPimpinan === 'menunggu-validasi').length;
        const disetujui = mockData.filter(l => l.statusValidasiPimpinan === 'disetujui').length;
        const ditolak = mockData.filter(l => l.statusValidasiPimpinan === 'ditolak').length;
        
        setStats({
          menungguValidasi: menunggu,
          disetujui: disetujui,
          ditolak: ditolak,
          total: mockData.length
        });
      } catch (error) {
        console.error('Error fetching laporan validasi:', error);
      }
    };

    fetchLaporanValidasi();
  }, [filters]);

  const handleValidasiSubmit = async (validasiData) => {
    try {
      // TODO: Submit validasi pimpinan via API
      console.log('Submitting validasi pimpinan:', {
        laporanId: selectedLaporan.id,
        ...validasiData
      });
      
      // Update local state
      setLaporanData(prev => prev.map(laporan => 
        laporan.id === selectedLaporan.id 
          ? { 
              ...laporan, 
              statusValidasiPimpinan: validasiData.status,
              validasiPimpinan: {
                ...validasiData,
                tanggalValidasi: new Date().toISOString().split('T')[0]
              }
            }
          : laporan
      ));
      
      setShowValidasiForm(false);
      setSelectedLaporan(null);
      
      // Refresh stats
      // TODO: Recalculate or refetch stats
      
    } catch (error) {
      console.error('Error submitting validasi:', error);
    }
  };

  const handleValidasiLaporan = (laporan) => {
    setSelectedLaporan(laporan);
    setShowValidasiForm(true);
  };

  const filteredLaporanData = laporanData.filter(laporan => {
    // Filter by status
    if (filters.status !== 'all' && laporan.statusValidasiPimpinan !== filters.status) {
      return false;
    }
    
    // Filter by search
    if (filters.search && !laporan.judul.toLowerCase().includes(filters.search.toLowerCase()) &&
        !laporan.pelapor.toLowerCase().includes(filters.search.toLowerCase()) &&
        !laporan.id.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="validasi-pimpinan-page">
      <AdminSidebar />
      <div className="validasi-pimpinan-content">
        <AdminHeader title="Validasi Pimpinan" />
        
        <ValidasiStats stats={stats} />
        
        <ValidasiFilters 
          filters={filters} 
          onFiltersChange={setFilters} 
        />
        
        <ValidasiTable 
          laporanData={filteredLaporanData}
          onValidasiLaporan={handleValidasiLaporan}
        />
        
        {showValidasiForm && (
          <ValidasiForm
            laporan={selectedLaporan}
            onSubmit={handleValidasiSubmit}
            onCancel={() => {
              setShowValidasiForm(false);
              setSelectedLaporan(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ValidasiPimpinan;