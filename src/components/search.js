import React from 'react';
import {
  TextField,
  Select,
  Grid,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({handleSearch, handleSearchParameter}) => {
  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <TextField
          fullWidth
          onChange={handleSearch}
          size="medium"
          id="outlined-search"
          type="search"
          variant="filled"
          placeholder="Search for books"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          defaultValue="Book-Name"
          onChange={handleSearchParameter}
          variant="outlined"
        >
          <MenuItem value="Author">Author</MenuItem>
          <MenuItem value="Book-Name">Book-Name</MenuItem>
        </Select>

      </Grid>
    </Grid>
  );
};

export default Search;
