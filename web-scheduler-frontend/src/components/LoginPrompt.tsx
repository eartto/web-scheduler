import './LoginPrompt.css'
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate('/');
  };

  return (
    <div className='login-prompt'>
      <p className='login-prompt-text'>please log in to continue</p>
      <input className='redirect-button' type="button" value={'log in'} onClick={() => redirect()}></input>
    </div>
  );
};

export default LoginPrompt;
