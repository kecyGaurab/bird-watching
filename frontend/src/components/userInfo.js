import React from 'react';
import { Grid, Avatar, Button, Hidden } from '@material-ui/core';

const UserInfo = ({ username, handleLogout }) => {
  const avatarText = username && username.charAt(0).toUpperCase();
  return (
    <Grid container direction="row">
      <Grid item>
        <Hidden only="xs">
          <Avatar>{avatarText}</Avatar>
        </Hidden>
      </Grid>
      <Grid item>
        <Button onClick={handleLogout}>Logout</Button>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
