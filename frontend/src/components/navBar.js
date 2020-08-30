/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography, Box, AppBar, Toolbar } from '@material-ui/core';
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
                <Box fontWeightBold>
                  <Typography variant="h3" color="primary">
                    Birds
                  </Typography>
                </Box>
              </Link>
            </Grid>
            {location.pathname === '/' ? (
              <Grid item xs={5} align="right">
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
