import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTimetable from './components/CreateTimetable';
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import LoginPrompt from './components/LoginPrompt';
import Timetables from './components/Timetables';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/timetables/:id" element={<Timetables />} />
          <Route path="/createtimetable" element={<CreateTimetable />} />
          <Route path="/loginprompt" element={<LoginPrompt />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
