/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const Header = ({ bird, handleRemove }) => {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={10}>
        <Typography variant="body1">
          Common name:
          {bird.commonname}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => handleRemove(bird.id)}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
