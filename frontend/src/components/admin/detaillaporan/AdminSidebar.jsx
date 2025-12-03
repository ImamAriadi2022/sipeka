import { useState } from 'react';
import { Badge, Button, Nav } from 'react-bootstrap';
import {
    FaBuilding,
    FaChartBar,
    FaCheckCircle,
    FaChevronLeft,
    FaChevronRight,
    FaClipboardList,
    FaCog,
    FaHome,
    FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome, path: '/admin/dashboard' },
    { id: 'kelola-laporan', label: 'Kelola Laporan', icon: FaClipboardList, path: '/admin/kelola-laporan', active: true },
    { id: 'validasi-pimpinan', label: 'Validasi Pimpinan', icon: FaCheckCircle, path: '/admin/validasi-pimpinan' },
    { id: 'riwayat-admin', label: 'Riwayat Admin', icon: FaChartBar, path: '/admin/riwayat-admin' },
    { id: 'pengaturan', label: 'Pengaturan', icon: FaCog, path: '/admin/pengaturan' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      // Clear session/token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className={`d-flex flex-column bg-dark text-white ${isCollapsed ? 'collapsed-sidebar' : 'expanded-sidebar'}`} style={{ minHeight: '100vh', width: isCollapsed ? '80px' : '250px', transition: 'width 0.3s' }}>
      <div className="p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaBuilding size={24} className="text-primary" />
            {!isCollapsed && <span className="ms-2 fw-bold">SIPEKA Admin</span>}
          </div>
          <Button 
            variant="outline-secondary"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </Button>
        </div>
      </div>

      <Nav className="flex-column flex-grow-1 p-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Nav.Item key={item.id} className="mb-1">
              <Nav.Link 
                onClick={() => handleMenuClick(item.path)}
                className={`d-flex align-items-center text-white p-2 rounded ${item.active ? 'bg-primary' : 'hover-bg-secondary'}`}
                title={isCollapsed ? item.label : ''}
                style={{ cursor: 'pointer' }}
              >
                <IconComponent size={18} />
                {!isCollapsed && (
                  <span className="ms-2">{item.label}</span>
                )}
                {item.active && !isCollapsed && (
                  <Badge bg="light" text="dark" className="ms-auto">Aktif</Badge>
                )}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>

      <div className="p-3 border-top border-secondary">
        <div className="d-flex align-items-center mb-2">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            <span>👤</span>
          </div>
          {!isCollapsed && (
            <div className="ms-2">
              <div className="small fw-bold">Admin User</div>
              <div className="small text-muted">Administrator</div>
            </div>
          )}
        </div>
        <Button 
          variant="outline-danger"
          size="sm"
          onClick={handleLogout}
          className="w-100"
          title="Logout"
        >
          <FaSignOutAlt className="me-1" />
          {!isCollapsed && 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;