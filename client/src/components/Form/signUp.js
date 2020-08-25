/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Link,
  Avatar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import userService from '../../services/signup';
import { setCurrentUser } from '../../redux/reducers/userReducer';

const SignUp = ({ history }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [information, setInformation] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInformation({
      ...information,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, confirmPassword } = information;
    if (!(firstName || lastName || username || password || confirmPassword)) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    if (password !== confirmPassword) {
      setError('Please make sure the passwords match');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
    try {
      await userService.signup(information);
      history.push('/login');
    } catch (err) {
      setError('Username already taken');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item align="center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item align="center">
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error ? (
              <Alert variant="outlined" severity="error">
                {error}
              </Alert>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              value={information.firstName}
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              id="lastName"
              label="Last Name"
              name="lastName"
              value={information.lastName}
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Username"
              name="username"
              onChange={handleChange}
              value={information.username}
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              onChange={handleChange}
              label="Password"
              type="password"
              value={information.password}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              onChange={handleChange}
              label="confirm password"
              type="password"
              value={information.confirmPassword}
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default connect(null, { setCurrentUser })(withRouter(SignUp));
