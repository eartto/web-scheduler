import './NaviBar.css';
import MiniHeader from './MiniHeader';
import { useNavigate } from 'react-router-dom';

const NaviBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navi-bar">
      <div className="navi-panel">
        <MiniHeader />
        <a className="navi-button" onClick={() => console.log('boom')}>
          Reservations
        </a>
        <a className="navi-button">New Reservation</a>
        <a className="navi-button">Timetables</a>
        <a className="navi-button">Create a Timetable</a>
        <div className="navi-panel-user">
          <a className="user-text">Username</a>
          <a className="logout-button" onClick={() => navigate('/')}>
            log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default NaviBar;
