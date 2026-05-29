import { createSlice, type Dispatch } from '@reduxjs/toolkit';
import type { User } from '../@types/global';

const initialState = {
  id: null,
  email: null,
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
});

export const loginUser = (user: User) => {
  return (dispatch: Dispatch) => {
    console.log('hey')
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
