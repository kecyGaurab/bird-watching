import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Box, Container, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Bird from '../components/bird/Bird';
import NavBar from '../components/NavBar';
import { getBird } from '../redux/reducers/birdReducer';
import Map from '../components/map/Map';

const BirdDetail = ({ match }) => {
  const dispatch = useDispatch();
  const bird = useSelector((state) => state.observations.bird);

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
        <Grid container justify="space-around" alignContent="center">
          <Grid item xs={12} md={4} sm={4}>
            <Bird bird={bird} />
          </Grid>
          <Grid item xs={12} md={8} sm={8}>
            <Card>
              {/* <GoogleMap latitude={bird.lat} longitude={bird.long} /> */}
              <Map lat={bird.lat} long={bird.long} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default withRouter(BirdDetail);
