import axios from 'axios';
import { URL } from '../constants/urls';
import type { Timetable } from '../@types/global';

axios.defaults.withCredentials = true;

const create = async (timetable: Timetable) => {
  const newTimetable: Timetable = {
    ...timetable,
  };
  const result = await axios.post(URL.TIMETABLE, newTimetable);
  console.log(result.data);
  return result.data;
};

export default { create };
