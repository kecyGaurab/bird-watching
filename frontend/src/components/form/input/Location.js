import React from 'react';
import { Typography, Grid, TextField, Button, Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import AddLocationIcon from '@material-ui/icons/AddLocation';

const Location = (props) => {
  const { locationReset, handleCustomLatitude, handleCustomLongitude, bird } = props;
  return (
    <Grid container direction="column" spacing={2} alignItems="stretch">
      <Grid item>
        <Typography>Enter Coordinates</Typography>
      </Grid>
      <Grid item>
        <TextField
          //   error={bird.lat < -90 || bird.lat > 90}
          error
          id="outlined-number"
          label="Latitude"
          type="number"
          value={bird.lat}
          onChange={handleCustomLatitude}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          error
          id="outlined-number"
          onChange={handleCustomLongitude}
          label="Longitude"
          type="number"
          value={bird.long}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item align="flex-end" xs={12}>
        <Button
          size="small"
          variant="outlined"
          onClick={handleCustomLongitude}
          endIcon={<AddLocationIcon />}
        >
          current location
        </Button>
        <Chip
          variant="outlined"
          color="primary"
          size="medium"
          label={bird.lat === 0 && bird.long === 0 ? 'location not added' : 'remove location'}
          onClick={locationReset}
          deleteIcon={<DoneIcon />}
        />
      </Grid>
    </Grid>
  );
};

export default Location;
