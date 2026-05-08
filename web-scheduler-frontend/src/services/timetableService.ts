import axios from 'axios';
import { URL } from '../constants/urls';
import type { Timetable } from '../@types/global';

const create = async (timetable: Timetable) => {
  const loggedUserJSON = window.localStorage.getItem('loggedWebSchedulerUser');
  const user = JSON.parse(loggedUserJSON!);
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  console.log(user)
  const newTimetable: Timetable = {
    timetableName: timetable.timetableName,
    timetableDescription: timetable.timetableDescription,
    reservationType: timetable.reservationType,
    restrictionDuration: timetable.restrictionDuration,
    restrictionFrequency: timetable.restrictionFrequency,
  };
  const result = await axios.post(URL.TIMETABLE, newTimetable, config);
  console.log(result.data);
  return result.data;
};

export default { create };
