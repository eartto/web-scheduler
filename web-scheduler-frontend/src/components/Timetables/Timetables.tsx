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
    <div>
      <NaviBar />
      <h2>Timetables</h2>
      <ul>
        {currentUser.timetables!.map((timetable) => (
          <li key={timetable.id}>
            <button
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
  );
};

export default Timetables;
