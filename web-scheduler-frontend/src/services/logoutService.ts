import axios from 'axios';
import { URL } from '../constants/urls';

axios.defaults.withCredentials = true;

const userLogout = async () => {
  try {
    const result = await axios.post(URL.LOGOUT);
    console.log(result.data);
    const logout = result.data;
    return logout;
  } catch (error) {
    if (error instanceof Error) {
      const logout = {
        errorMessage: 'logout',
      };
      return logout;
    }
  }
};

export default { userLogout };
