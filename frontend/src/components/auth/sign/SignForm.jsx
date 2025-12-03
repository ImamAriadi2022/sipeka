import { useState } from 'react';

const SignForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak sama');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit}>
      <h2>Buat Akun Baru</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Masukkan email"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Masukkan password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Konfirmasi password"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Nomor Telepon</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Masukkan nomor telepon"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Alamat</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          placeholder="Masukkan alamat lengkap"
        />
      </div>
      <button 
        type="submit" 
        className="sign-button"
        disabled={loading}
      >
        {loading ? 'Mendaftar...' : 'Daftar'}
      </button>
      <div className="form-footer">
        <p>Sudah punya akun? <a href="/login">Masuk di sini</a></p>
      </div>
    </form>
  );
};

export default SignForm;