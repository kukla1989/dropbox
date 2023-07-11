import React, { FC } from 'react';
import { FilesTable } from '../../Components/FilesTable/FilesTable';

interface MainPageProps {
  title?: string;
}

const MainPage: FC<MainPageProps> = ({ title }) => {


  return (
    <div className="main-page">
      <p>first page works! {title}</p>
      <FilesTable />
    </div>
  );
};

MainPage.defaultProps = {
  title: 'Default Title',
};

export { MainPage };
