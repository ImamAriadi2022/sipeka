import { Badge, Nav } from 'react-bootstrap';
import {
    FaChartBar,
    FaCheckCircle,
    FaClipboardList,
    FaCog,
    FaHome,
    FaSignOutAlt,
    FaUsers
} from 'react-icons/fa';

const AdminSidebar = () => {
  const menuItems = [
    { label: 'Dashboard Admin', path: '/admin/dashboard', icon: FaHome },
    { label: 'Kelola Laporan', path: '/admin/laporan', icon: FaClipboardList },
    { label: 'Validasi Pimpinan', path: '/admin/validasi-pimpinan', icon: FaCheckCircle },
    { label: 'Riwayat Aktivitas', path: '/admin/riwayat', icon: FaChartBar, active: true },
    { label: 'Manajemen User', path: '/admin/users', icon: FaUsers },
    { label: 'Pengaturan', path: '/admin/settings', icon: FaCog },
    { label: 'Logout', path: '/logout', icon: FaSignOutAlt }
  ];

  return (
    <div className="d-flex flex-column bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-4 border-bottom border-secondary">
        <h4 className="mb-0 text-primary">Sipeka Admin</h4>
        <Badge bg="success" className="mt-2">Administrator</Badge>
      </div>
      <Nav className="flex-column flex-grow-1 p-3">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Nav.Item key={index} className="mb-2">
              <Nav.Link 
                href={item.path}
                className={`d-flex align-items-center text-white p-3 rounded ${item.active ? 'bg-primary' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <IconComponent className="me-3" size={18} />
                {item.label}
                {item.active && <Badge bg="light" text="dark" className="ms-auto">Aktif</Badge>}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default AdminSidebar;