import React from "react";
import { Button, TextField, Grid, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({}) => {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          size="medium"
          id="outlined-search"
          type="search"
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="default" />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <Button size="large" variant="outlined" color="primary">
          search
        </Button>
      </Grid>
      <Grid item md={3} xs={12}></Grid>
    </Grid>
  );
};

export default Search;
