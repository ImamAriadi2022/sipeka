import { useEffect, useState } from 'react';
import './App.css';

// Import all pages
// Auth pages
import Login from './pages/Login';
import Sign from './pages/Sign';

// User pages
import BuatLaporan from './pages/user/BuatLaporan';
import Dashboard from './pages/user/Dashboard';
import Profil from './pages/user/Profil';
import RiwayatLaporan from './pages/user/RiwayatLaporan';

// Admin pages
import DashboardAdmin from './pages/admin/Dashboard';
import DetailLaporan from './pages/admin/DetailLaporan';
import KelolaaLaporan from './pages/admin/KelolaaLaporan';
import RiwayatAdmin from './pages/admin/RiwayatAdmin';
import ValidasiPimpinan from './pages/admin/ValidasiPimpinan';

// Simple router component (you can replace this with React Router later)
const SimpleRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('user'); // 'user' or 'admin'

  useEffect(() => {
    // Listen for navigation changes
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Mock authentication check (replace with real auth logic)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role || 'user');
    }
  }, []);

  // Navigation helper
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route protection
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Login />;
    }
    
    if (requiredRole && userRole !== requiredRole) {
      return <div>Access Denied</div>;
    }
    
    return children;
  };

  // Route rendering
  const renderRoute = () => {
    switch (currentPath) {
      case '/':
      case '/login':
        return isAuthenticated ? <Dashboard /> : <Login />;
      
      case '/sign':
        return <Sign />;
      
      case '/dashboard':
        return (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        );
      
      case '/buat-laporan':
        return (
          <ProtectedRoute>
            <BuatLaporan />
          </ProtectedRoute>
        );
      
      case '/riwayat-laporan':
        return (
          <ProtectedRoute>
            <RiwayatLaporan />
          </ProtectedRoute>
        );
      
      case '/profil':
        return (
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        );
      
      // Admin routes
      case '/admin/dashboard':
        return (
          <ProtectedRoute requiredRole="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        );
      
      case '/admin/laporan':
        return (
          <ProtectedRoute requiredRole="admin">
            <KelolaaLaporan />
          </ProtectedRoute>
        );
      
      case '/admin/laporan/detail':
        return (
          <ProtectedRoute requiredRole="admin">
            <DetailLaporan />
          </ProtectedRoute>
        );
      
      case '/admin/validasi-pimpinan':
        return (
          <ProtectedRoute requiredRole="admin">
            <ValidasiPimpinan />
          </ProtectedRoute>
        );
      
      case '/admin/riwayat':
        return (
          <ProtectedRoute requiredRole="admin">
            <RiwayatAdmin />
          </ProtectedRoute>
        );
      
      default:
        return (
          <div className="not-found">
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <button onClick={() => navigate('/dashboard')}>
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app">
      {renderRoute()}
    </div>
  );
};

function App() {
  return <SimpleRouter />;
}

export default App
