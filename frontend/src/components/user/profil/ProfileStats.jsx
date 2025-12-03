import { useEffect, useState } from 'react';

const ProfileStats = ({ userId }) => {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    completedReports: 0,
    memberSince: 0
  });

  useEffect(() => {
    // TODO: Fetch user statistics
    const fetchStats = async () => {
      // Mock data for now
      setStats({
        totalReports: 12,
        pendingReports: 3,
        completedReports: 9,
        memberSince: 8 // months
      });
    };
    
    if (userId) {
      fetchStats();
    }
  }, [userId]);

  return (
    <div className="profile-stats">
      <h3>Statistik Saya</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{stats.totalReports}</span>
          <span className="stat-label">Total Laporan</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{stats.pendingReports}</span>
          <span className="stat-label">Dalam Proses</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{stats.completedReports}</span>
          <span className="stat-label">Selesai</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{stats.memberSince}</span>
          <span className="stat-label">Bulan Bergabung</span>
        </div>
      </div>

      <div className="achievements">
        <h4>Pencapaian</h4>
        <div className="achievement-list">
          <div className="achievement-item">
            <span className="achievement-icon">🏆</span>
            <span className="achievement-text">Pelapor Aktif</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">⭐</span>
            <span className="achievement-text">Member Setia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;