import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import CreateTimetable from './components/CreateTimetable';
import LoginPrompt from './components/LoginPrompt';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createtimetable" element={<CreateTimetable />} />
          <Route path="/loginprompt" element={<LoginPrompt />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
