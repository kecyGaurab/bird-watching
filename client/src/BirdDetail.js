import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import SimpleMap from './GoogleMap';
import Bird from './components/Bird/bird';

const BirdDetail = (props) => {
  const { match, handleRemove, handleEdit, birds } = props;

  const { id } = match.params;
  const bird = birds && birds.find((b) => b.id === id);
  return (
    <Container>
      <Grid container direction="row" justify="space-around" alignContent="center">
        <Grid item xs={3}>
          <Bird handleRemove={handleRemove} handleEdit={handleEdit} bird={bird} />
        </Grid>
        <Grid item xs={9}>
          <SimpleMap latitude={bird && bird.latitude} longitude={bird && bird.longitude} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(BirdDetail);
