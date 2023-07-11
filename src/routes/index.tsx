import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, SecondPage } from '../pages';

const Routes: FC = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/second" component={SecondPage} />
  </Switch>
);

export default Routes;
