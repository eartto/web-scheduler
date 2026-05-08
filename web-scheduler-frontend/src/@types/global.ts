export interface User {
  token: string;
  email: string;
}

export interface Timetable {
  reservationType: string;
  restrictionDuration?: string;
  restrictionFrequency?: string;
  timetableDescription: string;
  timetableName: string;
}