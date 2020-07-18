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
  Card,
  CardContent,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { editBird } from '../redux/reducers/birdReducer';
import { usePosition } from '../hooks/position';

const EditBird = (props) => {
  const { latitude, longitude } = usePosition();

  const { match, birds } = props;
  const { id } = match.params;

  const bird = birds.find((b) => b.id === id);

  const [birdToEdit, setBirdToEdit] = useState({
    commonname: bird.commonname,
    species: bird.species,
    rarity: bird.rarity,
    latitude: bird.latitude,
    longitude: bird.longitude,
  });

  const handleNameChange = (e) => {
    e.preventDefault();
    setBirdToEdit({
      ...birdToEdit,
      commonname: e.target.value,
    });
  };
  const handleSpeciesChange = (e) => {
    e.preventDefault();
    setBirdToEdit({
      ...birdToEdit,
      species: e.target.value,
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
        ...bird,
        latitude,
        longitude,
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    props.editBird(id, birdToEdit).then(props.history.push(`/${id}`));
  };

  return (
    <Dialog open disablePortal disableEnforceFocus>
      <DialogActions>
        <Link style={{ textDecoration: 'none' }} to={`/${id}`}>
          <Button>
            <CloseIcon />
          </Button>
        </Link>
      </DialogActions>
      <DialogContent>
        <Card square>
          <CardContent>
            <form onSubmit={handleEditSubmit}>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">Edit Observation</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleNameChange}
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
                    onChange={handleSpeciesChange}
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
                    defaultValue="common"
                    placeholder={bird.rarity}
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
        </Card>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    birds: state.bird.charis,
  };
};

export default connect(mapStateToProps, { editBird })(withRouter(EditBird));
