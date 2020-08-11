import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Grid, Box, Container, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SimpleMap from '../components/GoogleMap';
import Bird from '../components/Bird/bird';
import NavBar from '../components/navBar';
import { getBird } from '../redux/reducers/birdReducer';

const BirdDetail = (props) => {
  const dispatch = useDispatch();
  const { match, bird } = props;
  const { id } = match.params;

  useEffect(() => {
    dispatch(getBird(id));
  }, [dispatch, id]);

  if (!bird) {
    return <p>loading</p>;
  }

  return (
    <Box>
      <NavBar />
      <Container>
        <Link to="/">
          <Button>
            <ArrowBackIcon />
            Back
          </Button>
        </Link>
        <Grid container direction="row" justify="space-around" alignContent="center">
          <Grid item />
          <Grid item xs={3}>
            <Bird bird={bird} />
          </Grid>
          <Grid item xs={9}>
            <SimpleMap latitude={bird && bird.lat} longitude={bird && bird.long} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    bird: state.observations.bird,
  };
};
export default connect(mapStateToProps, { getBird })(withRouter(BirdDetail));
