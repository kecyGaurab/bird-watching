import React from "react";
import {
  Select,
  TextField,
  InputLabel,
  Grid,
  Typography,
  MenuItem,
  Button,
  Card,
  CardContent,
  Input
} from "@material-ui/core";

const Form = ({ handleSubmit, handleChange, bird }) => {
  return (
    <Card square>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={2}>
              <Typography variant="h6">Enter Bird Info</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                type="text"
                label="Name"
                name="name"
                value={bird.name}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={handleChange}
                variant="outlined"
                type="text"
                label="Species"
                name="species"
                value={bird.species}
              />
            </Grid>
            <Grid item xs={2}>
              {/* <InputLabel for="rarity-select">Choose rarity:</InputLabel>
              <Select
                color="secondary"
                variant="outlined"
                inputProps={{
                  name: "rarity",
                  id: "rarity-select"
                }}
              >
                <MenuItem value="">--Please choose an option--</MenuItem>
                <MenuItem value="common">Common</MenuItem>
                <MenuItem value="rare">Rare</MenuItem>
                <MenuItem value="extremely rare">Extremely Rare</MenuItem>
              </Select> */}
            </Grid>
            <Grid item xs={3}>
              <label for="avatar">Choose a profile picture:</label>
              <Input type="file" accept="image/png, image/jpeg" />
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" variant="outlined">
                Submit
              </Button>
              <Button variant="outlined">Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
