import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultView from './components/DefaultView';
import UserDefaultView from './components/UserDefaultView';
import CreateTimetableView from './components/CreateTimetableView';
import { useEffect, useEffectEvent } from 'react';

import type { User } from './@types/user';
import { useAppDispatch } from './store';
import { loginUser } from './reducers/currentUserReducer';

const App = () => {
  const dispatch = useAppDispatch();

  const mountUser = useEffectEvent((user: User) => {
    dispatch(loginUser(user));
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedWebSchedulerUser'
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      mountUser(user);
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultView />} />
          <Route path="/home" element={<UserDefaultView />} />
          <Route path="/createtimetable" element={<CreateTimetableView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
