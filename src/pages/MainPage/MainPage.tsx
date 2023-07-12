import React, { FC } from 'react';
import { Main } from '../../Components/Main/Main';

interface MainPageProps {
  title?: string;
}

const MainPage: FC<MainPageProps> = ({ title }) => {
  return (
    <div className="main-page">
      <p>first page works! {title}</p>
      <Main />
    </div>
  );
};

MainPage.defaultProps = {
  title: 'Default Title',
};

export { MainPage };
