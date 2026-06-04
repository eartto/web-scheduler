export interface User {
  id?: string | null;
  email?: string | null;
}

export interface CurrentUserState {
  id?: string | null;
  email?: string | null;
  timetables?: Timetable[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string | null;
}

export interface Timetable {
  id?: string;
  timetableName: string;
  timetableDescription: string;
  reservationType: string;
  restrictionDuration?: number;
  restrictionFrequency?: number;
}
