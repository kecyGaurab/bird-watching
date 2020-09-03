/* eslint-disable no-shadow */
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AddBird from './components/form/AddBird';
import HomePage from './pages/HomePage';
import BirdDetail from './pages/BirdDetail';
import EditBird from './pages/EditBird';
import Login from './components/form/Login';
import SignUp from './components/form/SignUp';

const App = () => {
  return (
    <>
      <Route exact path={['/', '/add']} component={HomePage} />
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add" component={AddBird} />
        <Route path="/:id" component={BirdDetail} />
      </Switch>
      <Route path="/:id/edit" component={EditBird} />
    </>
  );
};

export default withRouter(App);
