/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React from 'react';
import { Link } from 'react-router-dom';
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
import AddLocationIcon from '@material-ui/icons/AddLocation';
import DoneIcon from '@material-ui/icons/Done';
import ImageUpload from './ImageUpload';
import DateAndTime from './DateAndTime';

const Form = (props) => {
  const {
    onSubmit,
    handleChange,
    handleRarityChange,
    handleImageChange,
    handleDateChange,
    handleLocation,
    bird,
    image,
    imageName,
    locationReset,
    title,
    redirectTo,
    clearImage,
    uploadButton,
  } = props;

  function isValidDate() {
    return bird.date instanceof Date && !isNaN(bird.date) && new Date() > bird.date;
  }

  return (
    <>
      <Dialog open disablePortal disableEnforceFocus>
        <Link
          data-testid="close-dialog"
          align="right"
          style={{ textDecoration: 'none' }}
          to={redirectTo}
        >
          <Button>
            <CloseIcon />
          </Button>
        </Link>
        <CardContent>
          <Grid
            container
            spacing={4}
            justify="space-between"
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item>
              <form onSubmit={onSubmit}>
                <Grid container direction="column" spacing={1}>
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
                    <ImageUpload
                      clearImage={clearImage}
                      handleImageChange={handleImageChange}
                      bird={bird}
                      imageName={imageName}
                      uploadButton={uploadButton}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DateAndTime handleDateChange={handleDateChange} date={bird.date} />
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleLocation}
                      endIcon={<AddLocationIcon />}
                    >
                      Add location
                    </Button>
                    <Chip
                      variant="outlined"
                      color="primary"
                      size="medium"
                      label={
                        bird.lat === 0 && bird.long === 0 ? 'location not added' : 'remove location'
                      }
                      onClick={locationReset}
                      deleteIcon={<DoneIcon />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      disabled={
                        !bird.commonname ||
                        !bird.rarity ||
                        image === null ||
                        image === 'File Not Found' ||
                        !isValidDate()
                      }
                      type="submit"
                      variant="outlined"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Dialog>
    </>
  );
};

export default Form;
