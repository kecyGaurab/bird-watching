import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddBird from './components/form/AddBird';
import HomePage from './pages/HomePage';
import BirdDetail from './pages/BirdDetail';
import EditBird from './pages/EditBird';
import Login from './components/form/Login';
import SignUp from './components/form/SignUp';

const App = () => {
  const isLoggedIn = useSelector((state) => state.user);

  return (
    <>
      <Route exact path={['/', '/add']} component={HomePage} />
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/add">
          {!isLoggedIn ? <Redirect to="/login" /> : <AddBird />}
        </Route>
        <Route path="/:id" component={BirdDetail} />
      </Switch>
      <Route path="/:id/edit" component={EditBird} />
    </>
  );
};

export default withRouter(App);
