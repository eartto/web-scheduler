import './Timetables.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTimetables } from '../../reducers/currentUserReducer';
import { useTypedSelector, useAppDispatch } from '../../store';
import NaviBar from '../NaviBar';

const Timetables = () => {
  const { id } = useParams();
  const currentUser = useTypedSelector((user) => user.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(id);
    console.log(currentUser);
    dispatch(fetchTimetables(id!));
  }, []);

  return (
    <div className="timetables">
      <NaviBar />
      <h1>Timetables</h1>
      <div className="timetables-list-frame">
        <ul className="timetables-list">
          {currentUser.timetables!.map((timetable) => (
            <li key={timetable.id}>
              <button
                className="timetable-button"
                type="button"
                onClick={() => {
                  console.log(timetable.timetableDescription);
                }}
              >
                {timetable.timetableName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timetables;
