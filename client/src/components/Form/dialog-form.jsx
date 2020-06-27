/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import withRouter from 'react-router-dom';
import Form from './form';

const DialogForm = ({
  handleSubmit,
  handleChange,
  handleImageChange,
  handleRarityChange,
  handleLocation,
  bird,
}) => {
  return (
    <Dialog open fullScreen disablePortal>
      <DialogContent>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleRarityChange={handleRarityChange}
          handleLocation={handleLocation}
          bird={bird}
        />
      </DialogContent>
    </Dialog>
  );
};

export default withRouter(DialogForm);
