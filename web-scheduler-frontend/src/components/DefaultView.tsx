import { useNavigate } from 'react-router-dom';
import './DefaultView.css';
import Header from './Header';
import SubHeader from './SubHeader';

const DefaultView = () => {
  const navigate = useNavigate();

  return (
    <div className="default-view">
      <Header />
      <SubHeader />
      <button className="big-button" onClick={() => navigate('/home')}>
        log in
      </button>
      <button
        className="big-button"
        onClick={() => console.log('create account')}
      >
        create account
      </button>
    </div>
  );
};

export default DefaultView;
