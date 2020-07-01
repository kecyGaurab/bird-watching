/* eslint-disable react/jsx-filename-extension */
import React from 'react';
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

import FileUpload from './file-upload';

const Form = (props) => {
  const {
    handleSubmit,
    handleChange,
    handleImageChange,
    handleRarityChange,
    handleLocation,
    bird,
  } = props;
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
            <form onSubmit={handleSubmit}>
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

export default withRouter(Form);
