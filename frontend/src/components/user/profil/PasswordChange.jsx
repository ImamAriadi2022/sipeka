import { useState } from 'react';

const PasswordChange = ({ onSubmit }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Password baru tidak sama');
      return;
    }
    
    onSubmit(passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="password-change">
      <h3>Ganti Password</h3>
      
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Password Saat Ini</label>
          <input
            type={showPasswords ? 'text' : 'password'}
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Password Baru</label>
          <input
            type={showPasswords ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Password Baru</label>
          <input
            type={showPasswords ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
            />
            Tampilkan password
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Ganti Password
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;