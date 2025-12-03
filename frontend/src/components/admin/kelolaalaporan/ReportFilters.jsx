
const ReportFilters = ({ filters, onFiltersChange }) => {
  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'Dalam Proses' },
    { value: 'resolved', label: 'Selesai' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'infrastruktur', label: 'Infrastruktur' },
    { value: 'kebersihan', label: 'Kebersihan' },
    { value: 'keamanan', label: 'Keamanan' },
    { value: 'pelayanan', label: 'Pelayanan Publik' },
    { value: 'lingkungan', label: 'Lingkungan' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: '7 Hari Terakhir' },
    { value: 'month', label: '30 Hari Terakhir' },
    { value: 'quarter', label: '3 Bulan Terakhir' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="report-filters">
      <div className="filters-row">
        <div className="filter-group">
          <label>Status</label>
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
          <label>Kategori</label>
          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {categoryOptions.map(option => (
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
            placeholder="Cari laporan..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button 
            className="btn-reset"
            onClick={() => onFiltersChange({
              status: 'all',
              category: 'all',
              dateRange: 'all',
              search: ''
            })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;