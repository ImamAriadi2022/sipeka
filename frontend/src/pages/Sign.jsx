import { useState } from 'react';
import SignForm from '../components/auth/sign/SignForm';
import SignHeader from '../components/auth/sign/SignHeader';

const Sign = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (userData) => {
    setLoading(true);
    // TODO: Implement sign up logic
    console.log('Sign up data:', userData);
    setLoading(false);
  };

  return (
    <div className="sign-page">
      <SignHeader />
      <div className="sign-container">
        <SignForm onSubmit={handleSignUp} loading={loading} />
      </div>
    </div>
  );
};

export default Sign;