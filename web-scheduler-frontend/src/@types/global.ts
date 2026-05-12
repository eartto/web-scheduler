export interface User {
  token: string;
  email: string;
}

export interface Timetable {
  reservationRestrictionDuration?: string;
  reservationRestrictionFrequency?: string;
  reservationType: string;
  restrictionDuration?: string;
  restrictionFrequency?: string;
  timetableDescription: string;
  timetableName: string;
}