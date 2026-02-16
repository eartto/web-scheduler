import './MiniHeader.css';
import { useNavigate } from 'react-router-dom';

const MiniHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="mini-header">
      <a className="mini-header-text" onClick={() => navigate('/home')}>
        Web Scheduler
      </a>
    </header>
  );
};

export default MiniHeader;
