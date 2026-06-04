import './LoadingLogin.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  }, [navigate]);

  return (
    <div className="loading-login-frame">
      <img
        className="logo"
        src="/src/assets/loading.png"
        alt="loading..."
      ></img>
    </div>
  );
};

export default LoadingLogin;
