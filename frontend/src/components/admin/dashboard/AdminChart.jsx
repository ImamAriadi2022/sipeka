import { Badge } from 'react-bootstrap';
import { FiTrendingUp } from 'react-icons/fi';

const AdminChart = ({ total }) => {
  return (
    <div>
      <div className="text-center fw-bold small mb-2">Diagram Laporan Masuk</div>
      <div style={{ background: '#fff6e9', borderRadius: 12, padding: 16, position: 'relative' }}>
        <svg width="100%" height="180" style={{ display: 'block' }}>
          {/* Axes */}
          <line x1="60" y1="20" x2="60" y2="150" stroke="#d9d9d9" strokeWidth="1" />
          <line x1="60" y1="150" x2="92%" y2="150" stroke="#d9d9d9" strokeWidth="1" />

          {/* Y-axis labels */}
          {[0,20,40,60,80,100,120,140].map((val, i) => (
            <text key={i} x={30} y={150 - val} fontSize="10" fill="#6b7a99">{val}</text>
          ))}

          {/* X-axis month labels */}
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
            <text key={m} x={60 + i * 60} y={165} fontSize="10" fill="#6b7a99">{m}</text>
          ))}

          {/* Line path and points to mimic figma trend */}
          <polyline
            fill="none"
            stroke="#2b5cab"
            strokeWidth="2"
            points="60,145 120,135 180,145 240,110 300,120 360,105 420,125 480,115 540,140 600,110 660,130 720,90"
          />
          {["60,145","120,135","180,145","240,110","300,120","360,105","420,125","480,115","540,140","600,110","660,130","720,90"].map((p, i) => {
            const [x,y] = p.split(',').map(Number);
            return <circle key={i} cx={x} cy={y} r="3" fill="#2b5cab" />;
          })}
        </svg>
        <div style={{ position: 'absolute', right: 16, bottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FiTrendingUp size={18} color="#2b5cab" />
          <Badge bg="warning" text="dark" pill>
            {total}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
