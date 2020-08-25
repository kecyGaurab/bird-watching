import React from 'react';
import { Grid, Avatar, Button } from '@material-ui/core';

const UserInfo = ({ user, handleLogout }) => {
  const avatarText = user.username.charAt(0).toUpperCase();
  return (
    <Grid container direction="row">
      <Grid item>
        <Avatar>{avatarText}</Avatar>
      </Grid>
      <Grid item>
        <Button onClick={handleLogout}>Logout</Button>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
