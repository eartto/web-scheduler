import './NaviBar.css';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { unsetUser } from '../../reducers/currentUserReducer';
import logoutService from '../../services/logoutService';
import { useAppDispatch, useTypedSelector } from '../../store';
import MiniHeader from './subcomponents/MiniHeader';

const NaviBar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useTypedSelector((user) => user.currentUser);
  const authUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authUser();
  }, []);

  const handleLogout = () => {
    logoutService.userLogout();
    dispatch(unsetUser());
    navigate('/');
  };

  if (!currentUser.email) {
    return (
      <div className="navi-bar">
        <div className="navi-panel">
          <MiniHeader />
          <a className="navi-button" onClick={() => console.log('boom')}>
            Reservations
          </a>
          <a className="navi-button">New Reservation</a>
          <a
            className="navi-button"
            onClick={() => navigate(`/timetables/${currentUser.id}`)}
          >
            Timetables
          </a>
          <a
            className="navi-button"
            onClick={() => navigate('/createtimetable')}
          >
            Create a Timetable
          </a>
          <div className="navi-panel-user">
            <a className="user-text">{' '}</a>
            <a className="logout-button" onClick={() => handleLogout()}>
              log out
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navi-bar">
        <div className="navi-panel">
          <MiniHeader />
          <a className="navi-button" onClick={() => console.log('boom')}>
            Reservations
          </a>
          <a className="navi-button">New Reservation</a>
          <a
            className="navi-button"
            onClick={() => navigate(`/timetables/${currentUser.id}`)}
          >
            Timetables
          </a>
          <a
            className="navi-button"
            onClick={() => navigate('/createtimetable')}
          >
            Create a Timetable
          </a>
          <div className="navi-panel-user">
            <a className="user-text">{currentUser.email!.split('@')[0]}</a>
            <a className="logout-button" onClick={() => handleLogout()}>
              log out
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default NaviBar;
