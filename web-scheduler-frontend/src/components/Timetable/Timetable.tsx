import './Timetable.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NaviBar from '../NaviBar';
import timetableService from '../../services/timetableService';
import type { Timetable as TimetableType } from '../../@types/global';
import Loading from '../Loading';

const Timetable = () => {
  const { id } = useParams();
  const [timetable, setTimetable] = useState<TimetableType>();

  useEffect(() => {
    timetableService.findById(id!).then((t) => {
      setTimetable(t);
    });
  }, []);

  if (!timetable) {
    return <Loading />;
  } else {
    return (
      <div className="timetable">
        <NaviBar />
        <h1>{timetable.timetableName}</h1>
        <div className="timetable-frame">{timetable.timetableDescription}</div>
      </div>
    );
  }
};

export default Timetable;
