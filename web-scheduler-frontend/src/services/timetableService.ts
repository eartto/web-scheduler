import axios from 'axios';
import type { timetable } from '../@types/timetable';
import { URL } from '../constants/urls';

const create = async (timetable: timetable) => {
  const newTimetable: timetable = {
    ...timetable,
  };
  const result = await axios.post(URL.TIMETABLE, newTimetable);
  console.log(result.data)
  return result.data;
};

export default { create };
