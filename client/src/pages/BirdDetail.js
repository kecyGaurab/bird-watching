import React from 'react';
import { Grid, Box, Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import SimpleMap from '../components/GoogleMap';
import Bird from '../components/Bird/bird';

const BirdDetail = (props) => {
  const { match, handleRemove, handleEdit, birds } = props;

  const { id } = match.params;
  const bird = birds && birds.find((b) => b.id === id);
  return (
    <Box>
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
    </Box>
  );
};

export default withRouter(BirdDetail);
