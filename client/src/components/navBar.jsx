/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Search from './search';

const NavBar = ({ query, handleQueryChange }) => (
  <>
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h3" color="primary">
              Birds
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Search handleQueryChange={handleQueryChange} query={query} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
);

export default NavBar;
