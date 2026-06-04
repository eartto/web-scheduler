import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../store';
import { loginUser } from '../reducers/currentUserReducer';
import authSessionService from '../services/authSessionService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useTypedSelector((user) => user.currentUser);

  return async () => {
    const response = await authSessionService.authenticate();
    if (response.authError) {
      navigate('/loginprompt');
    } else if (currentUser.email === null) {
      console.log('hoyyyyy')
      dispatch(loginUser(response));
    } else {
      return;
    }
  };
};
