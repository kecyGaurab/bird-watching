/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

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


const EditBird = (props) => {
  const { match, handleChange, handleRarityChange, handleLocation, birds } = props;
  const { id } = match.params;
  const bird = birds.find((b) => b.id === id);

  const [birdToEdit, setBirdToEdit] = useState({
    commonname: '',
    species: '',
    rarity: [],
    latitude: 0,
    longitude: 0,
    date: '',
  });

  const handleEditChange = (e) => {
    e.preventDefault();
    setBirdToEdit({
      ...birdToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    props.history.push('/');
  };

  return (
    <Dialog open disablePortal disableEnforceFocus>
      <DialogActions>
        <Link style={{ textDecoration: 'none' }} to="/">
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
                    onChange={handleEditChange}
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

export default withRouter(EditBird);
