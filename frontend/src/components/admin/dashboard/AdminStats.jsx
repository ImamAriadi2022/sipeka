const AdminStats = ({ selesai, proses, verifikasi }) => {
  return (
    <div className="mt-4" style={{ paddingLeft: 8, paddingRight: 8 }}>
      <div className="d-flex justify-content-between py-1"><span>Laporan selesai :</span><span className="fw-bold">{selesai}</span></div>
      <div className="d-flex justify-content-between py-1"><span>Laporan Dalam Proses :</span><span className="fw-bold">{proses}</span></div>
      <div className="d-flex justify-content-between py-1"><span>Laporan Menunggu Verifikasi :</span><span className="fw-bold">{verifikasi}</span></div>
    </div>
  );
};

export default AdminStats;
