import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import './App.scss';
import 'bulma/css/bulma.min.css';

const App: FC = () => (
  <>
    <HashRouter>
      <Routes />
    </HashRouter>
  </>
);

export default App;
