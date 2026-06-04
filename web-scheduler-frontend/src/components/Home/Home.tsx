import { useAuth } from '../../hooks/useAuth';
import { useTypedSelector } from '../../store';
import Loading from '../Loading';
import NaviBar from '../NaviBar';
import './Home.css';


import { useEffect } from 'react';



const Home = () => {
  const currentUser = useTypedSelector((user) => user.currentUser);
  const authUser = useAuth();

  useEffect(() => {
    authUser();
    console.log(currentUser)
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
