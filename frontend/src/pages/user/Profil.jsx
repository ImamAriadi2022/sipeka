import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import { authAPI } from '../../services/api';

const Profil = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', avatar: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await authAPI.getProfile();
        if (response.data.success) {
          const userData = response.data.user;
          setUser(userData);
          setEditForm({ 
            name: userData.fullName || userData.name || '', 
            email: userData.email || '', 
            avatar: userData.avatar || '' 
          });
          // Update localStorage
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Fallback to localStorage if API fails
        const cu = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (cu) {
          setUser(cu);
          setEditForm({ name: cu.fullName || cu.name || '', email: cu.email || '', avatar: cu.avatar || '' });
        }
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

    try {
      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('name', name);
      formData.append('email', email);
      
      // Handle avatar upload if file exists
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await authAPI.updateProfile(formData);
      
      if (response.data.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setIsEditing(false);
        setAvatarFile(null);
        alert('Profil berhasil diperbarui');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      alert(error.response?.data?.message || 'Gagal memperbarui profil');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
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

    if (!pwdForm.current || !pwdForm.next || !pwdForm.confirm) {
      setPwdError('Semua kolom wajib diisi.');
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

    try {
      const response = await authAPI.changePassword(pwdForm.current, pwdForm.next);
      
      if (response.data.success) {
        closePwdModal();
        alert('Password berhasil diubah.');
      }
    } catch (error) {
      console.error('Change password error:', error);
      setPwdError(error.response?.data?.message || 'Gagal mengubah password');
    }
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