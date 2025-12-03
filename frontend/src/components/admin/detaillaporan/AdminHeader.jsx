
const AdminHeader = ({ title = "Detail Laporan" }) => {
  return (
    <div className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="page-title">{title}</h1>
          <nav className="breadcrumb">
            <span className="breadcrumb-item">Dashboard</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-item">Kelola Laporan</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-item active">Detail Laporan</span>
          </nav>
        </div>
        <div className="header-right">
          <button 
            className="refresh-btn"
            onClick={() => window.location.reload()}
            title="Refresh halaman"
          >
            🔄 Refresh
          </button>
          <button 
            className="back-btn"
            onClick={() => window.history.back()}
            title="Kembali ke daftar laporan"
          >
            ← Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;