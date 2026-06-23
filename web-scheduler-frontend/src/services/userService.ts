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

const findUserById = async (id: string) => {
  try {
    const result = await axios.get(`${URL.USER}/${id}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      const result = {
        errorMessage: 'user not found',
      };
      return result;
    }
  }
};

export default { createUser, findUserById };
