import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';

const Profil = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user profile data
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const cu = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (cu) {
          setUser(cu);
          setEditForm({ name: cu.fullName || cu.name || '', email: cu.email || '', avatar: cu.avatar || '' });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const name = editForm.name.trim();
    const email = editForm.email.trim();
    if (!name || !email) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === (user?.email || ''));
    const updatedUser = {
      ...(idx >= 0 ? users[idx] : user || {}),
      fullName: name,
      email,
      avatar: editForm.avatar || (user?.avatar || ''),
    };
    if (idx >= 0) {
      users[idx] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEditForm({ ...editForm, avatar: reader.result });
    };
    reader.readAsDataURL(file);
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
              <img src={isEditing ? (editForm.avatar || '/img/avatar.png') : (user?.avatar || '/img/avatar.png')} alt="avatar" style={{ width: 80, height: 80, objectFit: 'cover' }} />
            </div>
            <div className="small text-muted mt-2 text-center">Informasi mengenai profil anda ada disini!</div>
          </div>

          <div className="mx-auto" style={{ maxWidth: '540px' }}>
            {!isEditing ? (
              <>
                <div className="fw-bold small mb-1">Nama Lengkap</div>
                <InputGroup className="mb-3">
                  <Form.Control type="text" value={user?.fullName || user?.name || 'Keysha'} readOnly />
                </InputGroup>

                <div className="fw-bold small mb-1">Email</div>
                <InputGroup className="mb-4">
                  <Form.Control type="email" value={user?.email || 'keysha@gmail.com'} readOnly />
                </InputGroup>

                <div className="d-flex justify-content-center gap-2">
                  <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profil</Button>
                  <Button variant="secondary" onClick={openPwdModal}>Ubah Password</Button>
                </div>
              </>
            ) : (
              <Form onSubmit={handleProfileUpdate}>
                <div className="fw-bold small mb-1">Foto Profil</div>
                <InputGroup className="mb-3">
                  <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
                </InputGroup>

                <div className="fw-bold small mb-1">Nama Lengkap</div>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </InputGroup>

                <div className="fw-bold small mb-1">Email</div>
                <InputGroup className="mb-4">
                  <Form.Control
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </InputGroup>

                <div className="d-flex justify-content-center gap-2">
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>Batal</Button>
                  <Button variant="primary" type="submit">Simpan</Button>
                </div>
              </Form>
            )}
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