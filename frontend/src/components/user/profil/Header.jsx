
const Header = ({ title }) => {
  return (
    <header className="page-header">
      <div className="header-content">
        <h1>{title}</h1>
        <div className="breadcrumb">
          <a href="/dashboard">Dashboard</a> / <span>Profil</span>
        </div>
      </div>
    </header>
  );
};

export default Header;