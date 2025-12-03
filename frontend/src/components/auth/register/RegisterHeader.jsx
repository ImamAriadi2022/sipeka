
const RegisterHeader = () => {
  return (
    <div className="text-center w-100">
      <div className="mb-4">
        <img 
          src="/img/logo-unila.png" 
          alt="Universitas Lampung Logo" 
          style={{ width: '120px', height: 'auto' }}
        />
      </div>
      
      <div className="text-dark">
        <h5 className="fw-bold mb-3 lh-base">
          Sistem Pelaporan dan<br/>
          Pemantauan Kerusakan<br/>
          Fasilitas Kampus (SIPEKA)
        </h5>
        
        <div className="mt-4">
          <p className="mb-2 fw-normal text-muted">Program Studi</p>
          <p className="fw-bold mb-0 text-dark">Teknik Informatika</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterHeader;