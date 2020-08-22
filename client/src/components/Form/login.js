import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import loginService from '../../services/login';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login(credentials);
    setCredentials({ username: '', password: '' });
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container direction="column" justify="center">
        <Grid item align="center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item align="center">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleLogin} noValidate>
        <TextField
          fullWidth
          id="outlined-name"
          autoComplete="username"
          label="Username"
          name="username"
          value={credentials.username}
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
