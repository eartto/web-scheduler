import axios from 'axios';
import { URL } from '../constants/urls';
import type { LoginFormInputs } from '../@types/FrontPage';

const userLogin = async (user: LoginFormInputs) => {
  try {
    const result = await axios.post(URL.LOGIN, user);
    console.log(result.data);
    const login = result.data;
    return login;
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
