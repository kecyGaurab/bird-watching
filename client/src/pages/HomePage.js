/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Button } from '@material-ui/core';
import { useDispatch, connect } from 'react-redux';
import Bird from '../components/Bird/bird';
import { initializeBirds } from '../redux/reducers/birdReducer';
import NavBar from '../components/navBar';

const mapStateToProps = (state) => {
  return {
    birds: state.bird.charis,
  };
};

const HomePage = (props) => {
  const [query, setQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState('');
  const { birds } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBirds());
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
          <Grid item xs={12}>
            {/* <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            {error ? (
              <Alert onClose={handleClose} severity="error">
                {message}
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="success">
                {message}
              </Alert>
            )}
          </Snackbar> */}
          </Grid>
          <Grid item xs={12} align="center">
            <Link style={{ textDecoration: 'none' }} to="/add">
              <Button size="large" variant="outlined">
                Add New
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

export default connect(mapStateToProps)(withRouter(HomePage));
