
const ReportForm = ({ data, onChange, onSubmit }) => {
  const categories = [
    'Infrastruktur',
    'Kebersihan',
    'Keamanan',
    'Pelayanan Publik',
    'Lingkungan',
    'Lainnya'
  ];

  const priorities = [
    { value: 'low', label: 'Rendah' },
    { value: 'medium', label: 'Sedang' },
    { value: 'high', label: 'Tinggi' },
    { value: 'urgent', label: 'Mendesak' }
  ];

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Informasi Laporan</h3>
        
        <div className="form-group">
          <label htmlFor="title">Judul Laporan</label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Masukkan judul laporan"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            value={data.category}
            onChange={(e) => handleChange('category', e.target.value)}
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Prioritas</label>
          <select
            id="priority"
            value={data.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Jelaskan detail masalah atau keluhan Anda"
            rows={5}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary">
          Simpan Draft
        </button>
        <button type="submit" className="btn-primary">
          Kirim Laporan
        </button>
      </div>
    </form>
  );
};

export default ReportForm;