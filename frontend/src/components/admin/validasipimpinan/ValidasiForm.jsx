import { useState } from 'react';

const ValidasiForm = ({ laporan, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    status: laporan?.validasiPimpinan?.status || 'disetujui',
    validatorName: laporan?.validasiPimpinan?.validatorName || '',
    catatan: laporan?.validasiPimpinan?.catatan || '',
    anggaranDisetujui: laporan?.validasiPimpinan?.anggaranDisetujui || laporan?.estimasiBiaya || 0,
    tanggalValidasiOffline: laporan?.validasiPimpinan?.tanggalValidasiOffline || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.validatorName.trim()) {
      newErrors.validatorName = 'Nama pimpinan yang memvalidasi harus diisi';
    }
    
    if (!formData.catatan.trim()) {
      newErrors.catatan = 'Catatan validasi harus diisi';
    }
    
    if (formData.status === 'disetujui' && formData.anggaranDisetujui <= 0) {
      newErrors.anggaranDisetujui = 'Anggaran yang disetujui harus lebih dari 0';
    }
    
    if (!formData.tanggalValidasiOffline) {
      newErrors.tanggalValidasiOffline = 'Tanggal validasi offline harus diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="validasi-form-overlay">
      <div className="validasi-form-modal">
        <div className="modal-header">
          <h2>Catat Hasil Validasi Pimpinan</h2>
          <p className="modal-subtitle">
            Laporan: <strong>{laporan?.judul}</strong> (ID: {laporan?.id})
          </p>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <div className="laporan-summary">
            <h3>Ringkasan Laporan</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <label>Pelapor:</label>
                <span>{laporan?.pelapor} (NIM: {laporan?.nim})</span>
              </div>
              <div className="summary-item">
                <label>Kategori:</label>
                <span>{laporan?.kategori}</span>
              </div>
              <div className="summary-item">
                <label>Estimasi Biaya:</label>
                <span>{formatCurrency(laporan?.estimasiBiaya)}</span>
              </div>
              <div className="summary-item">
                <label>Prioritas:</label>
                <span className={`priority-${laporan?.prioritas}`}>{laporan?.prioritas}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="validasi-form">
            <div className="form-group">
              <label htmlFor="status">Status Validasi Pimpinan *</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                required
              >
                <option value="disetujui">✅ Disetujui</option>
                <option value="ditolak">❌ Ditolak</option>
              </select>
              {errors.status && <span className="error-message">{errors.status}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="validatorName">Nama Pimpinan yang Memvalidasi *</label>
              <input
                type="text"
                id="validatorName"
                value={formData.validatorName}
                onChange={(e) => handleChange('validatorName', e.target.value)}
                placeholder="Contoh: Dr. Budi Santoso, M.Si."
                required
              />
              {errors.validatorName && <span className="error-message">{errors.validatorName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tanggalValidasiOffline">Tanggal Validasi Offline *</label>
              <input
                type="date"
                id="tanggalValidasiOffline"
                value={formData.tanggalValidasiOffline}
                onChange={(e) => handleChange('tanggalValidasiOffline', e.target.value)}
                required
              />
              <small className="field-help">Tanggal ketika pimpinan memberikan validasi secara offline</small>
              {errors.tanggalValidasiOffline && <span className="error-message">{errors.tanggalValidasiOffline}</span>}
            </div>

            {formData.status === 'disetujui' && (
              <div className="form-group">
                <label htmlFor="anggaranDisetujui">Anggaran yang Disetujui *</label>
                <input
                  type="number"
                  id="anggaranDisetujui"
                  value={formData.anggaranDisetujui}
                  onChange={(e) => handleChange('anggaranDisetujui', parseInt(e.target.value) || 0)}
                  min="0"
                  step="100000"
                  required
                />
                <small className="field-help">
                  Estimasi awal: {formatCurrency(laporan?.estimasiBiaya)}
                </small>
                {errors.anggaranDisetujui && <span className="error-message">{errors.anggaranDisetujui}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="catatan">Catatan Validasi *</label>
              <textarea
                id="catatan"
                value={formData.catatan}
                onChange={(e) => handleChange('catatan', e.target.value)}
                rows={4}
                placeholder={formData.status === 'disetujui' 
                  ? "Contoh: Disetujui dengan anggaran maksimal sesuai yang diminta. Pelaksanaan harus selesai dalam 30 hari."
                  : "Contoh: Ditolak karena tidak sesuai dengan prioritas anggaran tahun ini. Silakan ajukan kembali tahun depan."}
                required
              />
              {errors.catatan && <span className="error-message">{errors.catatan}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Batal
              </button>
              <button type="submit" className="btn-submit">
                💾 Simpan Validasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ValidasiForm;