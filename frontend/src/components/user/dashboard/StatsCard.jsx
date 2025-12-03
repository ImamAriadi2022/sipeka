
const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-content">
        <div className="stats-info">
          <h3>{title}</h3>
          <p className="stats-value">{value}</p>
        </div>
        <div className="stats-icon">
          {icon || '📊'}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;