import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import CreateTimetable from './components/CreateTimetable';
import { useEffect, useEffectEvent } from 'react';

import { useAppDispatch } from './store';
import { loginUser } from './reducers/currentUserReducer';
import type { User } from './@types/global';

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
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createtimetable" element={<CreateTimetable />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
