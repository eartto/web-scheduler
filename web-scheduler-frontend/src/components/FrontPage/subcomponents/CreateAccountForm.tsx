import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { useForm, useWatch, FormProvider } from 'react-hook-form';

import Notification from './Notification';

import type {
  CreateAccountSetState,
  CreateAccountFormInputs,
} from '../../../@types/FrontPage';
import userService from '../../../services/userService';

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

export default CreateAccountForm;
