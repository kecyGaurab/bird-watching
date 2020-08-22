import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Notification = (props) => {
  const { message } = props;

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open autoHideDuration={4000}>
      <Alert severity="success">{message}</Alert>
    </Snackbar>
  );
};

export default Notification;
