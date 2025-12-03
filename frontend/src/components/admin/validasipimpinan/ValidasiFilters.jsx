
const ValidasiFilters = ({ filters, onFiltersChange }) => {
  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'menunggu-validasi', label: 'Menunggu Validasi' },
    { value: 'disetujui', label: 'Disetujui Pimpinan' },
    { value: 'ditolak', label: 'Ditolak Pimpinan' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: '7 Hari Terakhir' },
    { value: 'month', label: '30 Hari Terakhir' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="validasi-filters">
      <div className="filters-header">
        <h3>Filter Laporan Validasi</h3>
      </div>
      
      <div className="filters-row">
        <div className="filter-group">
          <label>Status Validasi</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Periode</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Pencarian</label>
          <input
            type="text"
            placeholder="Cari ID, judul, atau nama pelapor..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button 
            className="btn-reset"
            onClick={() => onFiltersChange({
              status: 'menunggu-validasi',
              dateRange: 'all',
              search: ''
            })}
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidasiFilters;