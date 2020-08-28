/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const ImageUpload = (props) => {
  const { handleImageChange, imageName, clearImage, uploadButton } = props;
  return (
    <>
      <input
        style={{ display: 'none' }}
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        value={undefined}
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button startIcon={<PhotoCamera />} variant="contained" color="secondary" component="span">
          {uploadButton}
        </Button>
        {imageName || null}
        <IconButton
          style={{ display: imageName ? 'inline' : 'none' }}
          type="reset"
          onClick={clearImage}
        >
          <HighlightOffIcon />
        </IconButton>
      </label>
    </>
  );
};

export default ImageUpload;
