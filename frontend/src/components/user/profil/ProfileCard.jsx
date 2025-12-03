
const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img 
          src={user?.avatar || '/default-avatar.png'} 
          alt="Profile" 
          className="avatar-image"
        />
        <button className="change-avatar-btn">📷</button>
      </div>
      
      <div className="profile-info">
        <h2>{user?.name || 'Nama User'}</h2>
        <p className="user-email">{user?.email || 'user@example.com'}</p>
        <p className="user-role">
          <span className="role-badge">{user?.role || 'User'}</span>
        </p>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Nomor Telepon:</span>
            <span className="detail-value">{user?.phone || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Alamat:</span>
            <span className="detail-value">{user?.address || '-'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Bergabung:</span>
            <span className="detail-value">{user?.joinDate || 'Januari 2025'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;