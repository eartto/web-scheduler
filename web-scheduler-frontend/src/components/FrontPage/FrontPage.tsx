import { useState } from 'react';

import './FrontPage.css';
import type { ButtonPanelProps } from '../../@types/FrontPage';

import Header from './subcomponents/Header';
import CreateAccountForm from './subcomponents/CreateAccountForm';
import LoginForm from './subcomponents/LoginForm';
import LoadingLogin from './subcomponents/LoadingLogin';
import SubHeader from './subcomponents/SubHeader';

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
  const [loadingView, setLoadingView] = useState<boolean>(false);

  return (
    <div className="front-page">
      <Header />
      <SubHeader />
      {!loginView && !createAccountView && !loadingView ? (
        <ButtonsPanel
          setLoginView={setLoginView}
          setCreateAccountView={setCreateAccountView}
        />
      ) : null}
      {loginView && !loadingView ? (
        <LoginForm
          setLoginView={setLoginView}
          setLoadingView={setLoadingView}
        />
      ) : null}
      {createAccountView && !loadingView ? (
        <CreateAccountForm setCreateAccountView={setCreateAccountView} />
      ) : null}
      {loadingView ? <LoadingLogin /> : null}
    </div>
  );
};

export default FrontPage;
