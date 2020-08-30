/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Grid, InputAdornment, Link, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { removeUser } from '../redux/reducers/userReducer';
import UserInfo from './userInfo';

const Search = ({ query, handleQueryChange, user, removeUser }) => {
  const handleLogout = async () => {
    try {
      await removeUser();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={2} justify="center">
      <Grid item >
        <TextField
          size="large"
          fullWidth
          id="outlined-search"
          type="search"
          variant="outlined"
          placeholder="Search for observations"
          onChange={handleQueryChange}
          value={query}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        {user !== null ? (
          <UserInfo username={user.username} handleLogout={handleLogout} />
        ) : (
          <Link href="/login" variant="body1">
            <Button>Login</Button>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps, { removeUser })(Search);
