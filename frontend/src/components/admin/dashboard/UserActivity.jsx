
const UserActivity = () => {
  const activities = [
    {
      user: 'John Doe',
      action: 'Membuat laporan baru',
      time: '2 menit yang lalu',
      type: 'create'
    },
    {
      user: 'Jane Smith',
      action: 'Mengedit profil',
      time: '15 menit yang lalu',
      type: 'update'
    },
    {
      user: 'Bob Johnson',
      action: 'Login ke sistem',
      time: '30 menit yang lalu',
      type: 'login'
    },
    {
      user: 'Alice Brown',
      action: 'Membuat laporan baru',
      time: '1 jam yang lalu',
      type: 'create'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create': return '📝';
      case 'update': return '✏️';
      case 'login': return '🔐';
      default: return '👤';
    }
  };

  return (
    <div className="user-activity">
      <div className="widget-header">
        <h3>Aktivitas User Terkini</h3>
        <button className="refresh-btn">🔄</button>
      </div>
      
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-text">
                <strong>{activity.user}</strong> {activity.action}
              </p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <a href="/admin/activity" className="view-all-activity">
        Lihat Semua Aktivitas
      </a>
    </div>
  );
};

export default UserActivity;