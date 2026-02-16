import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultView from './components/DefaultView';
import UserDefaultView from './components/UserDefaultView';
import CreateTimetableView from './components/CreateTimetableView';

const App = () => {
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
