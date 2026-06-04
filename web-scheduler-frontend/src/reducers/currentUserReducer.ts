import { createAsyncThunk, createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { User, CurrentUserState } from '../@types/global';
import timetableService from '../services/timetableService';

const initialState: CurrentUserState = {
  id: null,
  email: null,
  timetables: [],
  loading: 'idle',
  error: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.id = user.id;
      state.email = user.email;
      return state;
    },
    unsetUser: (state) => {
      state.id = null;
      state.email = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTimetables.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchTimetables.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.timetables = action.payload;
    });
    builder.addCase(fetchTimetables.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const fetchTimetables = createAsyncThunk(
  'currentUser/fetchTimetables',
  async (id: string) => {
    const response = await timetableService.getAllByUserId(id);
    return response;
  }
);

export const loginUser = (user: User) => {
  return (dispatch: Dispatch) => {
    console.log('hey');
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch) => {
    dispatch(unsetUser());
  };
};

export const { setUser, unsetUser } = currentUserSlice.actions;

const currentUserReducer = currentUserSlice.reducer;

export default currentUserReducer;
