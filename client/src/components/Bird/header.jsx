/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

const Header = ({ bird, handleRemove }) => {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={9}>
        <Typography variant="body1">
          Common name: &nbsp;
          {bird.commonname}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleRemove(bird.id)}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleRemove(bird.id)}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
