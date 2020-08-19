/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Button } from '@material-ui/core';

function ImageChange({ handleImageChange, bird }) {
  return (
    <div className="ImageChange">
      <label htmlFor="upload-photo">
        <input
          style={{ display: 'inline' }}
          value={bird.image}
          onChange={handleImageChange}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          id="upload-photo"
          name="upload-photo"
        />
        <Fab color="primary" size="medium" component="span" aria-label="add" variant="extended">
          <AddIcon />
          Change Image
        </Fab>
      </label>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" type="reset" >
          Upload
        </Button>
      </label>
    </div>
  );
}

export default ImageChange;
