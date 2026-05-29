import './Home.css';
import NaviBar from './NaviBar';
import Loading from './Loading';

import { useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useTypedSelector } from '../store';

const Home = () => {
  const currentUser = useTypedSelector((user) => user.currentUser);
  const authUser = useAuth();

  useEffect(() => {
    authUser();
  }, [authUser]);

  if (!currentUser.email) {
    return <Loading />;
  } else {
    return (
      <div className="home">
        <NaviBar />
        <div className="image">image</div>
        <div>Upcoming reservations</div>
        <div className="frame"></div>
      </div>
    );
  }
};

export default Home;
