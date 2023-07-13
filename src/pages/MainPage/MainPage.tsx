import React, { FC } from 'react';
import { Main } from '../../Components/Main/Main';

const MainPage: FC = () => {
  return (
    <div className="main-page">
      <Main />
    </div>
  );
};

MainPage.defaultProps = {
  title: 'Default Title',
};

export { MainPage };
