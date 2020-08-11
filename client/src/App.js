import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AddBird from './components/Form/addBird';
import HomePage from './pages/HomePage';
import BirdDetail from './pages/BirdDetail';
import EditBird from './pages/EditBird';

const App = () => {
  return (
    <>
      <Route exact path={['/', '/add']} component={HomePage} />
      <Switch>
        <Route exact path="/add" component={AddBird} />
        <Route path="/:id" component={BirdDetail} />
      </Switch>
      <Route path="/:id/edit" component={EditBird} />
    </>
  );
};

export default withRouter(App);
