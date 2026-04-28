import axios from 'axios';
import { URL } from '../constants/urls';
import type { CreateAccountFormInputs } from '../@types/FrontPage';

const createUser = async (user: CreateAccountFormInputs) => {
  try {
    const result = await axios.post(URL.USER, user);
    console.log(result.data);
    const createdUser = result.data;
    return createdUser;
  } catch (error) {
    if (error instanceof Error) {
      const createdUser = {
        errorMessage: 'user creation failed',
      };
      return createdUser;
    }
  }
};

export default { createUser };
