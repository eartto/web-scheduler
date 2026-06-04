import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Notification from './Notification';

import type {
  LoginFormProps,
  LoginFormInputs,
} from '../../../@types/FrontPage';

import { loginUser } from '../../../reducers/currentUserReducer';
import loginService from '../../../services/loginService';
import { useAppDispatch } from '../../../store';

const LoginForm = (props: LoginFormProps) => {
  const methods = useForm<LoginFormInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);

  const setNotification = (message: string | null) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    const user = await loginService.userLogin(data);
    if (user?.errorMessage) {
      setNotification(user.errorMessage);
    } else if (user !== undefined) {
      console.log(user);
      dispatch(loginUser(user));
      props.setLoadingView(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="login-form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <input
          className="back-button"
          onClick={() => props.setLoginView(false)}
          type="button"
          value={'back'}
        />
        <label htmlFor="email">email:</label>
        <br />
        <input
          className="email-input"
          autoFocus
          id="email"
          placeholder="email"
          {...register('email', {
            required: 'email required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        <br />
        <label htmlFor="password">password:</label>
        <br />
        <input
          className="password-input"
          type="password"
          id="password"
          placeholder="password"
          {...register('password', {
            required: 'password required',
          })}
        />
        <br />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
        <Notification message={message} />
        <input className="submit-button" type="submit" value={'log in'} />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
