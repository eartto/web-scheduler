import { createAsyncThunk, createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { User, CurrentUserState } from '../@types/global';
import userService from '../services/userService';

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
      state.timetables = user.timetables;
      return state;
    },
    unsetUser: (state) => {
      state.id = null;
      state.email = null;
      state.timetables = undefined;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.timetables = action.payload.timetables;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const fetchUser = createAsyncThunk(
  'currentUser/fetchUser',
  async (id: string) => {
    const response = await userService.findUserById(id);
    return response;
  }
);

export const loginUser = (user: User) => {
  return (dispatch: Dispatch) => {
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
