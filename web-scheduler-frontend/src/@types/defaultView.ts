import type { Dispatch, SetStateAction } from 'react';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface CreateAccountFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginSetState {
  setLoginView: Dispatch<SetStateAction<boolean>>;
}

export interface CreateAccountSetState {
  setCreateAccountView: Dispatch<SetStateAction<boolean>>;
}

export interface ButtonPanelProps {
  setLoginView: Dispatch<SetStateAction<boolean>>;
  setCreateAccountView: Dispatch<SetStateAction<boolean>>;
}
