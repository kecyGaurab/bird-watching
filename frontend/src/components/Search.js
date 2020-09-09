import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Grid, InputAdornment, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { removeUser } from '../redux/reducers/userReducer';
import UserInfo from './UserInfo';

const Search = ({ query, handleQueryChange }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(removeUser());
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={2} justify="center">
      <Grid item>
        <TextField
          size="medium"
          fullWidth
          id="outlined-search"
          type="search"
          variant="outlined"
          placeholder="Search observations.."
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

export default Search;
