import './Timetables.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser } from '../../reducers/currentUserReducer';
import { useTypedSelector, useAppDispatch } from '../../store';
import NaviBar from '../NaviBar';
import Loading from '../Loading';

const Timetables = () => {
  const { id } = useParams();
  const currentUser = useTypedSelector((user) => user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser(id!));
  }, []);

  if (currentUser.loading === 'pending') {
    return (
      <div className="timetables">
        <Loading />
      </div>
    );
  } else if (currentUser.timetables !== undefined) {
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
                    navigate(`/timetable/${timetable.id}`);
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
  }
};

export default Timetables;
