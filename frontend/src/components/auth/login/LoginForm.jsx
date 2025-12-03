import { useState } from 'react';

const LoginForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Masuk ke Akun Anda</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Masukkan email Anda"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Masukkan password Anda"
        />
      </div>
      <button 
        type="submit" 
        className="login-button"
        disabled={loading}
      >
        {loading ? 'Masuk...' : 'Masuk'}
      </button>
      <div className="form-footer">
        <a href="/forgot-password">Lupa Password?</a>
        <p>Belum punya akun? <a href="/sign">Daftar di sini</a></p>
      </div>
    </form>
  );
};

export default LoginForm;