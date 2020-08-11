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
import DoneIcon from '@material-ui/icons/Done';
import FileUpload from './imageUpload';

const Form = (props) => {
  const {
    onSubmit,
    handleChange,
    handleRarityChange,
    handleImageChange,
    handleLocation,
    bird,
    locationReset,
    title,
    redirectTo,
  } = props;

  return (
    <>
      <Dialog open disablePortal disableEnforceFocus>
        <Link align="right" style={{ textDecoration: 'none' }} to={redirectTo}>
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
                    {bird.image ? <p>{bird.image}</p> : null}
                    <FileUpload handleImageChange={handleImageChange} bird={bird} />
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" onClick={handleLocation}>
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
                        bird.image === null ||
                        bird.image === 'File Not Found'
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
