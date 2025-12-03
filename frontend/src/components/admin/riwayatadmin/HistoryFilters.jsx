import { useState } from 'react';

const HistoryFilters = ({ onFilterChange, filters }) => {
  const [localFilters, setLocalFilters] = useState({
    dateRange: filters.dateRange || 'today',
    actionType: filters.actionType || 'all',
    admin: filters.admin || 'all',
    status: filters.status || 'all',
    searchTerm: filters.searchTerm || ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'today',
      actionType: 'all',
      admin: 'all',
      status: 'all',
      searchTerm: ''
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="history-filters">
      <h4>Filter Riwayat</h4>
      <div className="filters-row">
        {/* Search */}
        <div className="filter-group">
          <label>Cari Aktivitas</label>
          <input
            type="text"
            placeholder="Cari berdasarkan deskripsi..."
            value={localFilters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Date Range */}
        <div className="filter-group">
          <label>Periode</label>
          <select
            value={localFilters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="filter-select"
          >
            <option value="today">Hari Ini</option>
            <option value="yesterday">Kemarin</option>
            <option value="this-week">Minggu Ini</option>
            <option value="this-month">Bulan Ini</option>
            <option value="last-month">Bulan Lalu</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Action Type */}
        <div className="filter-group">
          <label>Jenis Aktivitas</label>
          <select
            value={localFilters.actionType}
            onChange={(e) => handleFilterChange('actionType', e.target.value)}
            className="filter-select"
          >
            <option value="all">Semua Aktivitas</option>
            <option value="create">Membuat Laporan</option>
            <option value="update">Update Status</option>
            <option value="delete">Hapus Data</option>
            <option value="assign">Assign Petugas</option>
            <option value="validate">Validasi</option>
            <option value="export">Export Data</option>
          </select>
        </div>

        {/* Admin Filter */}
        <div className="filter-group">
          <label>Admin</label>
          <select
            value={localFilters.admin}
            onChange={(e) => handleFilterChange('admin', e.target.value)}
            className="filter-select"
          >
            <option value="all">Semua Admin</option>
            <option value="admin1">Admin 1</option>
            <option value="admin2">Admin 2</option>
            <option value="admin3">Admin 3</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label>Status</label>
          <select
            value={localFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">Semua Status</option>
            <option value="success">Berhasil</option>
            <option value="pending">Pending</option>
            <option value="failed">Gagal</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="filter-group">
          <button 
            onClick={resetFilters}
            className="reset-filters-btn"
            title="Reset semua filter"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;