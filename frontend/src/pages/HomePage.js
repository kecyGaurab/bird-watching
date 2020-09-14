/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Bird from '../components/bird/Bird';
import { initializeBirds } from '../redux/reducers/birdReducer';
import NavBar from '../components/NavBar';
import { setCurrentUser } from '../redux/reducers/userReducer';

const HomePage = () => {
  const dispatch = useDispatch();
  const birds = useSelector((state) => state.observations.birds);
  const user = useSelector((state) => state.user);
  const [query, setQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState('');

  useEffect(() => {
    dispatch(initializeBirds());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const getUser = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(getUser));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleFilter = () => {
      const matchedBirds = birds.filter((n) =>
        n.commonname.toLowerCase().startsWith(query.toLowerCase()),
      );
      setFilteredBirds(matchedBirds);
    };
    handleFilter();
  }, [query, birds]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const sortedBirds = birds.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <NavBar query={query} handleQueryChange={handleQueryChange} />
      <Container>
        <Grid justify="space-around" container direction="row" spacing={5}>
          <Grid item xs={12} align="center">
            <Link style={{ textDecoration: 'none' }} to={user.currentUser ? '/add' : '/login'}>
              <Button size="large" color="primary" variant="outlined">
                Add New Observation
              </Button>
            </Link>
          </Grid>
          {filteredBirds
            ? filteredBirds.map((b) => (
                <Grid key={b.id} item xs={12} md={3}>
                  <Bird bird={b} />
                </Grid>
              ))
            : sortedBirds &&
              sortedBirds.map((b) => (
                <Grid key={b.id} item xs={12} md={3}>
                  <Bird bird={b} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </>
  );
};

export default withRouter(HomePage);
