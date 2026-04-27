import './NaviBar.css';
import MiniHeader from './MiniHeader';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../store';
import { unsetUser } from '../reducers/currentUserReducer';

const NaviBar = () => {
  const dispatch = useAppDispatch();
  const username = useTypedSelector<string | null>(
    (state) => state.currentUser.email
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(unsetUser());
    navigate('/');
  };
  return (
    <div className="navi-bar">
      <div className="navi-panel">
        <MiniHeader />
        <a className="navi-button" onClick={() => console.log('boom')}>
          Reservations
        </a>
        <a className="navi-button">New Reservation</a>
        <a className="navi-button">Timetables</a>
        <a className="navi-button" onClick={() => navigate('/createtimetable')}>
          Create a Timetable
        </a>
        <div className="navi-panel-user">
          <a className="user-text">{username?.split('@')[0]}</a>
          <a className="logout-button" onClick={() => handleLogout()}>
            log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default NaviBar;
