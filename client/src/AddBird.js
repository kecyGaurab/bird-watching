import React from 'react';
import { Dialog, Button, DialogContent, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Form from './components/Form/form';

const AddBird = ({ bird, ...props }) => {
  const {
    handleSubmit,
    handleChange,
    handleImageChange,
    handleRarityChange,
    handleLocation,
    open,
  } = { ...props };
  return (
    <Dialog open disablePortal disableEnforceFocus>
      <DialogActions>
        <Button onClick={() => console.log('clicked')}>
          <CloseIcon />
        </Button>
      </DialogActions>
      <DialogContent>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleRarityChange={handleRarityChange}
          handleLocation={handleLocation}
          bird={bird}
          open={open}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddBird;
