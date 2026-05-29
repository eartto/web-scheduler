import axios from 'axios';
import { URL } from '../constants/urls';

axios.defaults.withCredentials = true;

const authenticate = async () => {
  try {
    const result = await axios.get(URL.AUTHSESSION);
    console.log(result.data);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

export default { authenticate };
