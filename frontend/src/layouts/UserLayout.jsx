import Sidebar from '../components/user/dashboard/Sidebar';

const UserLayout = ({ children }) => {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
