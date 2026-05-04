import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';

import './FrontPage.css';
import Header from './Header';
import SubHeader from './SubHeader';
import loginService from '../services/loginService';
import userService from '../services/userService';

import { useAppDispatch } from '../store';
import { loginUser } from '../reducers/currentUserReducer';
import type {
  LoginFormInputs,
  CreateAccountFormInputs,
  ButtonPanelProps,
  CreateAccountSetState,
  LoginSetState,
} from '../@types/FrontPage';

const Notification = ({ message }: { message: string | null }) => {
  if (message) {
    return (
      <div>
        <p className="error-message">{message}</p>
      </div>
    );
  } else {
    return null;
  }
};

const LoginForm = ({ setLoginView }: LoginSetState) => {
  const methods = useForm<LoginFormInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      dispatch(loginUser(user));
      window.localStorage.setItem(
        'loggedWebSchedulerUser',
        JSON.stringify(user)
      );
      navigate('/home');
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
          onClick={() => setLoginView(false)}
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

const CreateAccountForm = ({ setCreateAccountView }: CreateAccountSetState) => {
  const methods = useForm<CreateAccountFormInputs>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const passwordValue = useWatch({
    control,
    name: 'password',
  });
  const [message, setMessage] = useState<string | null>(null);

  const setNotification = (message: string | null) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const onSubmit = async (data: CreateAccountFormInputs) => {
    const user = await userService.createUser(data);
    if (user?.errorMessage) {
      setNotification(user.errorMessage);
    }
    setCreateAccountView(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="create-account-form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <input
          className="back-button"
          onClick={() => setCreateAccountView(false)}
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
              message: 'please enter a valid email address',
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
        <label htmlFor="password">confirm password:</label>
        <br />
        <input
          className="password-input"
          type="password"
          id="confirm-password"
          placeholder="confirm password"
          {...register('passwordConfirm', {
            required: 'confirm password',
            validate: (confirmPassword: string) => {
              if (passwordValue != confirmPassword) {
                return 'passwords do not match';
              }
            },
          })}
        />
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
        <ErrorMessage
          errors={errors}
          name="passwordConfirm"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
        <Notification message={message} />
        <br />
        <input
          className="submit-button"
          type="submit"
          value={'create account'}
        />
      </form>
    </FormProvider>
  );
};

const ButtonsPanel = ({
  setCreateAccountView,
  setLoginView,
}: ButtonPanelProps) => {
  return (
    <div>
      <button className="big-button" onClick={() => setLoginView(true)}>
        log in
      </button>
      <button className="big-button" onClick={() => setCreateAccountView(true)}>
        create account
      </button>
    </div>
  );
};

const FrontPage = () => {
  const [loginView, setLoginView] = useState<boolean>(false);
  const [createAccountView, setCreateAccountView] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedWebSchedulerUser'
    );
    if (loggedUserJSON) {
      dispatch(loginUser(JSON.parse(loggedUserJSON)));
      navigate('/home');
    }
  }, [dispatch, navigate]);

  return (
    <div className="front-page">
      <Header />
      <SubHeader />
      {!loginView && !createAccountView ? (
        <ButtonsPanel
          setLoginView={setLoginView}
          setCreateAccountView={setCreateAccountView}
        />
      ) : null}
      {loginView ? <LoginForm setLoginView={setLoginView} /> : null}
      {createAccountView ? (
        <CreateAccountForm setCreateAccountView={setCreateAccountView} />
      ) : null}
    </div>
  );
};

export default FrontPage;
