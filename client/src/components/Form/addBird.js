/* eslint-disable no-alert */
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
  Chip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Resizer from 'react-image-file-resizer';
import { createBird } from '../../redux/reducers/birdReducer';
import { usePosition } from '../../hooks/position';
import FileUpload from './imageUpload';
import Notification from '../Notification';

const AddBird = (props) => {
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

  console.log('image', image);

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
    <>
      <Dialog open disablePortal disableEnforceFocus>
        <Link align="right" style={{ textDecoration: 'none' }} to="/">
          <Button>
            <CloseIcon />
          </Button>
        </Link>
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
                <FileUpload handleImageChange={handleImageChange} bird={bird} image={image} />
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleLocation}>
                  Add location
                </Button>
                <Chip
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  label={bird.latitude && bird.longitude ? 'location added' : 'location not added'}
                  onClick={() => {
                    setBird({
                      ...bird,
                      latitude: 0,
                      longitude: 0,
                    });
                  }}
                  deleteIcon={<DoneIcon />}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  disabled={
                    !bird.commonname || !bird.rarity || image === null || image === 'File Not Found'
                  }
                  type="submit"
                  variant="outlined"
                >
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

export default connect(null, { createBird })(withRouter(AddBird));
