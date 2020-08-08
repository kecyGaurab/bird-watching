/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Grid, Input, InputLabel } from '@material-ui/core';

const FileUpload = ({ handleImageChange, bird }) => {
  return (
    <Grid container direction="row" justify="space-between">
      <Grid item xs={12}>
        <InputLabel>Upload image:</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <Input
          value={bird.image}
          onChange={handleImageChange}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
        />
      </Grid>
    </Grid>
  );
};

export default FileUpload;
