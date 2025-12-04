import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';

const Profil = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user profile data
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // Implement API call
        // const userData = await api.getUserProfile();
        // setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (updatedData) => {
    // TODO: Update user profile
    console.log('Updating profile:', updatedData);
    setIsEditing(false);
  };

  const [showPwdModal, setShowPwdModal] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current: '', next: '', confirm: '' });
  const [pwdError, setPwdError] = useState('');

  const openPwdModal = () => {
    setPwdForm({ current: '', next: '', confirm: '' });
    setPwdError('');
    setShowPwdModal(true);
  };

  const closePwdModal = () => {
    setShowPwdModal(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdError('');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const email = user?.email || 'keysha@gmail.com';
    const idx = storedUsers.findIndex(u => u.email === email);
    const currentUser = idx >= 0 ? storedUsers[idx] : null;

    if (!currentUser) {
      setPwdError('Profil tidak ditemukan.');
      return;
    }
    if (!pwdForm.current || !pwdForm.next || !pwdForm.confirm) {
      setPwdError('Semua kolom wajib diisi.');
      return;
    }
    if (currentUser.password && pwdForm.current !== currentUser.password) {
      setPwdError('Password saat ini tidak sesuai.');
      return;
    }
    if (pwdForm.next.length < 6) {
      setPwdError('Password baru minimal 6 karakter.');
      return;
    }
    if (pwdForm.next !== pwdForm.confirm) {
      setPwdError('Konfirmasi password tidak cocok.');
      return;
    }

    storedUsers[idx] = { ...currentUser, password: pwdForm.next };
    localStorage.setItem('users', JSON.stringify(storedUsers));
    // Optionally update current user in storage
    const cu = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (cu && cu.email === email) {
      localStorage.setItem('currentUser', JSON.stringify({ ...cu, password: pwdForm.next }));
    }
    closePwdModal();
    alert('Password berhasil diubah.');
  };

  if (loading) {
    return <div className="dashboard-content">Loading...</div>;
  }

  return (
    <div className="dashboard-content">
      <h5 className="text-center fw-bold mb-3" style={{ color: '#333' }}>Profil Saya</h5>
      <Card className="mx-auto" style={{ maxWidth: '720px', border: '4px solid #2b5cab', borderRadius: 10 }}>
        <Card.Body style={{ background: '#f3f6fb', padding: 18 }}>
          <div className="d-flex flex-column align-items-center mb-3">
            <div style={{ width: 92, height: 92, borderRadius: '50%', overflow: 'hidden', background: '#fff', border: '2px solid #cfd6e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* avatar placeholder; replace with user photo if available */}
              <img src="/img/avatar.png" alt="avatar" style={{ width: 80, height: 80, objectFit: 'cover' }} />
            </div>
            <div className="small text-muted mt-2 text-center">Informasi mengenai profil anda ada disini!</div>
          </div>

          <div className="mx-auto" style={{ maxWidth: '540px' }}>
            <div className="fw-bold small mb-1">Nama Lengkap</div>
            <InputGroup className="mb-3">
              <Form.Control type="text" value={user?.name || 'Keysha'} readOnly />
            </InputGroup>

            <div className="fw-bold small mb-1">Email</div>
            <InputGroup className="mb-4">
              <Form.Control type="email" value={user?.email || 'keysha@gmail.com'} readOnly />
              <span className="input-group-text"><FiEdit /></span>
            </InputGroup>

            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={openPwdModal}>Ubah Password</Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showPwdModal} onHide={closePwdModal} centered>
        <Form onSubmit={handlePasswordChange}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pwdError && (
              <div className="alert alert-danger py-2" role="alert">{pwdError}</div>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Password Saat Ini</Form.Label>
              <Form.Control
                type="password"
                value={pwdForm.current}
                onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password Baru</Form.Label>
              <Form.Control
                type="password"
                value={pwdForm.next}
                onChange={(e) => setPwdForm({ ...pwdForm, next: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Konfirmasi Password Baru</Form.Label>
              <Form.Control
                type="password"
                value={pwdForm.confirm}
                onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closePwdModal}>Batal</Button>
            <Button variant="primary" type="submit">Simpan</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Profil;