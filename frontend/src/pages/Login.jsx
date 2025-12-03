import { useState } from 'react';
import LoginForm from '../components/auth/login/LoginForm';
import LoginHeader from '../components/auth/login/LoginHeader';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    // TODO: Implement login logic
    console.log('Login credentials:', credentials);
    setLoading(false);
  };

  return (
    <div className="login-page">
      <LoginHeader />
      <div className="login-container">
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default Login;