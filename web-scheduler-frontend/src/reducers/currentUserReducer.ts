import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { User } from '../@types/global';

const initialState = {
  loggedIn: false,
  token: null,
  email: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const currentUser = action.payload;
      currentUser.loggedIn = true;
      state = currentUser;
      return currentUser;
    },
    unsetUser: (state) => {
      state.token = null;
      state.email = null;
      return state;
    },
  },
});

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
