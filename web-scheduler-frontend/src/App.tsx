import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultView from './components/DefaultView';
import UserDefaultView from './components/UserDefaultView';

const App = () => {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<DefaultView />} />
            <Route path="/home" element={<UserDefaultView />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
