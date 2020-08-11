/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Grid, Input, InputLabel, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const FileUpload = ({ handleImageChange, bird }) => {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={12}>
        <InputLabel>Upload image:</InputLabel>
      </Grid>
      <Grid item xs={9}>
        <Input
          value={bird.image}
          onChange={handleImageChange}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
        />
      </Grid>
      <Grid item xs={3} align="center">
        <IconButton type="reset">
          <HighlightOffIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FileUpload;
