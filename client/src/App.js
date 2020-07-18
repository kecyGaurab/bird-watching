import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Form from './components/Form/form';
import HomePage from './pages/HomePage';
import BirdDetail from './pages/BirdDetail';
import EditBird from './pages/EditBird';

const App = () => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Switch>
        <Route path="/add" component={Form} />
        <Route path="/:id" component={BirdDetail} />
      </Switch>
      <Route path="/:id/edit" component={EditBird} />
    </>
  );
};

export default withRouter(App);
