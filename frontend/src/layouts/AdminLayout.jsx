import AdminSidebar from '../components/admin/dashboard/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="dashboard-page">
      <AdminSidebar />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
