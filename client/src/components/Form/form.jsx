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
import Resizer from 'react-image-file-resizer';
import { createBird } from '../../redux/reducers/birdReducer';
import { usePosition } from '../../hooks/position';

import FileUpload from './file-upload';

const Form = (props) => {
  const [bird, setBird] = useState({
    commonname: '',
    species: '',
    rarity: [],
    latitude: 0,
    longitude: 0,
    date: '',
  });

  const [image, setImage] = useState(null);
  const { latitude, longitude } = usePosition();

  const handleChange = (e) => {
    e.preventDefault();
    setBird({
      ...bird,
      [e.target.name]: e.target.value,
    });
  };

  const handleRarityChange = (e) => {
    setBird({
      ...bird,
      rarity: e.target.value,
    });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        240,
        190,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'blob',
      );
    });

  const handleImageChange = async (e) => {
    e.preventDefault();
    const birdImage = e.target.files[0];
    const resizedImage = await resizeFile(birdImage);
    setImage(resizedImage);
  };

  const handleLocation = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to add location?'))
      setBird({
        ...bird,
        latitude,
        longitude,
      });
  };

  const addBird = () => {
    props.createBird(bird, image).then(props.history.push('/'));
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
            <form onSubmit={addBird}>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">Enter new observation</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    variant="outlined"
                    type="text"
                    label="Name"
                    name="commonname"
                    value={bird.commonname}
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
                    value={bird.species}
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
                    onChange={handleRarityChange}
                  >
                    <MenuItem value="common">common</MenuItem>
                    <MenuItem value="rare">rare</MenuItem>
                    <MenuItem value="extremely-rare">extremely rare</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <FileUpload handleImageChange={handleImageChange} bird={bird} />
                </Grid>
                <Grid item>
                  <Button onClick={handleLocation}>Add location</Button>
                  <Typography>{bird.location}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={!bird.commonname || !bird.rarity}
                    type="submit"
                    variant="outlined"
                  >
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

export default connect(null, { createBird })(withRouter(Form));
