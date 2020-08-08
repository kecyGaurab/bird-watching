/* eslint-disable no-alert */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Select,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Button,
  CardContent,
  InputLabel,
  Dialog,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { editBird } from '../redux/reducers/birdReducer';
import { usePosition } from '../hooks/position';

const EditBird = (props) => {
  const { latitude, longitude } = usePosition();

  const { match, bird, history } = props;
  const { id } = match.params;
  const { commonname, species, rarity, lat, long } = bird;

  const [birdToEdit, setBirdToEdit] = useState({
    commonname,
    species,
    rarity,
    latitude: lat === undefined ? 0 : lat,
    longitude: long === undefined ? 0 : long,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setBirdToEdit({
      ...birdToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleRarityChange = (e) => {
    setBirdToEdit({
      ...birdToEdit,
      rarity: e.target.value,
    });
  };

  const handleLocation = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to add location?'))
      setBirdToEdit({
        ...birdToEdit,
        latitude,
        longitude,
      });
  };

  const handleEditSubmit = () => {
    props.editBird(id, birdToEdit).then(history.push(`/${id}`));
  };

  return (
    <>
      {/* <Notification open /> */}
      <Dialog open disablePortal disableEnforceFocus>
        <Link style={{ textDecoration: 'none' }} to={`/${id}`}>
          <Button>
            <CloseIcon />
          </Button>
        </Link>
        <CardContent>
          <form onSubmit={handleEditSubmit}>
            <Grid container direction="column" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Edit Observation</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                  type="text"
                  label="Name"
                  name="commonname"
                  placeholder={bird.commonname}
                  value={birdToEdit.commonname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                  type="text"
                  label="Species"
                  name="species"
                  placeholder={bird.species}
                  value={birdToEdit.species}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="rarity-select">Choose rarity:</InputLabel>
                <Select
                  fullWidth
                  color="secondary"
                  variant="standard"
                  inputProps={{
                    id: 'rarity-select',
                  }}
                  defaultValue={bird.rarity}
                  onChange={handleRarityChange}
                >
                  <MenuItem value="common">common</MenuItem>
                  <MenuItem value="rare">rare</MenuItem>
                  <MenuItem value="extremely-rare">extremely rare</MenuItem>
                </Select>
              </Grid>
              <Grid item>
                <Button onClick={handleLocation}>Add location</Button>
                <Typography>{birdToEdit.location}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bird: state.observations.bird,
  };
};

export default connect(mapStateToProps, { editBird })(withRouter(EditBird));
