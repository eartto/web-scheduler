import axios from 'axios';
import { URL } from '../constants/urls';
import type { Timetable } from '../@types/global';

axios.defaults.withCredentials = true;

const create = async (timetable: Timetable) => {
  const newTimetable: Timetable = {
    timetableName: timetable.timetableName,
    timetableDescription: timetable.timetableDescription,
    reservationType: timetable.reservationType,
    restrictionDuration: Number(timetable.restrictionDuration),
    restrictionFrequency: Number(timetable.restrictionFrequency),
  };
  const result = await axios.post(URL.TIMETABLE, newTimetable);
  console.log(result.data);
  return result.data;
};

const edit = async (id: string, timetable: Timetable) => {
  const newTimetable: Timetable = {
    timetableName: timetable.timetableName,
    timetableDescription: timetable.timetableDescription,
    reservationType: timetable.reservationType,
    restrictionDuration: Number(timetable.restrictionDuration),
    restrictionFrequency: Number(timetable.restrictionFrequency),
  };
  const result = await axios.put(`${URL.TIMETABLE}/${id}`, newTimetable);
  console.log(result.data);
  return result.data;
};

const findById = async (id: string) => {
  const response = await axios.get(`${URL.TIMETABLE}/${id}`);
  return response.data;
};

export default { create, findById, edit };
