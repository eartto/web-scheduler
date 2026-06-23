import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../store';
import { loginUser } from '../reducers/currentUserReducer';
import authSessionService from '../services/authSessionService';
import userService from '../services/userService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useTypedSelector((user) => user.currentUser);

  return async () => {
    const response = await authSessionService.authenticate();
    if (response.authError) {
      navigate('/loginprompt');
    } else if (currentUser.email === null) {
      const user = await userService.findUserById(response.id);
      dispatch(loginUser(user));
    } else {
      return;
    }
  };
};
