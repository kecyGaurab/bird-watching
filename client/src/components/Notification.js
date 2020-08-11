import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Notification = (props) => {
  const { children, open } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={600}
    >
      <Alert severity="warning">{children}</Alert>
    </Snackbar>
  );
};

export default Notification;
