import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Bird from '../components/bird/Bird';
import { initializeBirds } from '../redux/reducers/birdReducer';
import NavBar from '../components/NavBar';
import { setCurrentUser } from '../redux/reducers/userReducer';
import Hero from '../components/common/Hero';
import Footer from '../components/common/Footer';

const HomePage = () => {
  const dispatch = useDispatch();

  const birds = useSelector((state) => state.observations.birds);
  const user = useSelector((state) => state.user);

  const [query, setQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState('');

  useEffect(() => {
    dispatch(initializeBirds());

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(savedUser));
    }

    const handleFilter = () => {
      const matchedBirds = birds.filter((n) =>
        n.commonname.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredBirds(matchedBirds);
    };
    handleFilter();
  }, [dispatch, query, birds]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const sortedBirds = [...birds.sort((a, b) => new Date(b.date) - new Date(a.date))];

  return (
    <>
      <NavBar query={query} handleQueryChange={handleQueryChange} />
      <Container>
        <Grid justify="space-around" container direction="row" spacing={2}>
          <Grid item xs={12} align="center">
            <Hero>
              <Link style={{ textDecoration: 'none' }} to={user.currentUser ? '/add' : '/login'}>
                <Button size="large" color="primary" variant="outlined">
                  Add New Observation
                </Button>
              </Link>
            </Hero>
          </Grid>
          {filteredBirds
            ? filteredBirds.map((bird) => (
                <Grid key={bird.id} item xs={12} md={3}>
                  <Bird bird={bird} />
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
      <Footer />
    </>
  );
};

export default withRouter(HomePage);
