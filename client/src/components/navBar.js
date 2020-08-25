/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Search from './search';

const NavBar = (props) => {
  const { handleQueryChange, query, location } = props;
  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item xs={3} align="right">
              <Link style={{ textDecoration: 'none' }} to="/">
                <Typography variant="h3" color="primary">
                  Birds
                </Typography>
              </Link>
            </Grid>
            {location.pathname === '/' ? (
              <Grid item xs={6}>
                <Search query={query} handleQueryChange={handleQueryChange} />
              </Grid>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(NavBar);
