/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Grid, Snackbar, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Bird from '../components/Bird/bird';

const HomePage = ({ birds, ...props }) => {
  const { charis } = props;
  const Alert = () => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const sortedBirds = charis.sort((a, b) => new Date(b.date) - new Date(a.date));

  const { handleClose, open, message, handleRemove, error, filteredBirds } = {
    ...props,
  };
  return (
    <Container>
      <Grid justify="space-around" container direction="row" spacing={5}>
        <Grid item xs={12}>
          <Snackbar
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
          </Snackbar>
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
                <Bird handleRemove={handleRemove} bird={b} />
              </Grid>
            ))
          : sortedBirds &&
            sortedBirds.map((b) => (
              <Grid key={b.id} item xs={12} md={3}>
                <Bird handleRemove={handleRemove} bird={b} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    charis: state.bird.charis,
  };
};

export default connect(mapStateToProps)(withRouter(HomePage));
