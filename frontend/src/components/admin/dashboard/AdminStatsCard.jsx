
const AdminStatsCard = ({ title, value, icon, trend, color }) => {
  return (
    <div className={`admin-stats-card ${color}`}>
      <div className="stats-header">
        <h3>{title}</h3>
        <span className="stats-icon">{icon || '📊'}</span>
      </div>
      <div className="stats-body">
        <p className="stats-value">{value}</p>
        {trend && (
          <span className={`stats-trend ${trend.type}`}>
            {trend.type === 'up' ? '↗️' : '↘️'} {trend.percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminStatsCard;