import { useEffect, useState } from 'react';
import Header from '../../components/user/profil/Header';
import PasswordChange from '../../components/user/profil/PasswordChange';
import ProfileCard from '../../components/user/profil/ProfileCard';
import ProfileForm from '../../components/user/profil/ProfileForm';
import ProfileStats from '../../components/user/profil/ProfileStats';
import Sidebar from '../../components/user/profil/Sidebar';

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

  const handlePasswordChange = async (passwordData) => {
    // TODO: Change user password
    console.log('Changing password');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profil-page">
      <Sidebar />
      <div className="profil-content">
        <Header title="Profil Saya" />
        <div className="profile-container">
          <div className="profile-main">
            <ProfileCard user={user} />
            {isEditing ? (
              <ProfileForm 
                user={user}
                onSubmit={handleProfileUpdate}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profil
              </button>
            )}
          </div>
          <div className="profile-sidebar">
            <ProfileStats userId={user?.id} />
            <PasswordChange onSubmit={handlePasswordChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;