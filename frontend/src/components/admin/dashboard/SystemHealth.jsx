
const SystemHealth = () => {
  const healthMetrics = [
    { label: 'Server Uptime', value: '99.8%', status: 'good' },
    { label: 'Response Time', value: '145ms', status: 'good' },
    { label: 'Database Load', value: '67%', status: 'warning' },
    { label: 'Memory Usage', value: '82%', status: 'warning' },
    { label: 'Disk Space', value: '45%', status: 'good' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#28a745';
      case 'warning': return '#ffc107';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="system-health">
      <div className="widget-header">
        <h3>Kesehatan Sistem</h3>
        <span className="last-updated">Update terakhir: 1 menit yang lalu</span>
      </div>
      
      <div className="health-metrics">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="health-metric">
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
            <div 
              className="metric-indicator"
              style={{ backgroundColor: getStatusColor(metric.status) }}
            ></div>
          </div>
        ))}
      </div>

      <div className="system-status">
        <div className="status-indicator good"></div>
        <span>Sistem Berjalan Normal</span>
      </div>
    </div>
  );
};

export default SystemHealth;