import axios from 'axios';
import { URL } from '../constants/urls';
import type { LoginFormInputs } from '../@types/FrontPage';

axios.defaults.withCredentials = true;

const userLogin = async (user: LoginFormInputs) => {
  try {
    const result = await axios.post(URL.LOGIN, user);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      const login = {
        errorMessage: 'invalid email or password',
      };
      return login;
    }
  }
};

export default { userLogin };
