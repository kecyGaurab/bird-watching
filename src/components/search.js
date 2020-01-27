import React from 'react';
import {
  Button,
  TextField,
  Select,
  Grid,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {StyledButton} from './styledComponents';

const Search = ({
  handleSubmit,
  handleSearch,
  handleSearchParameter,
  query,
  searchParameter,
}) => {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={6}>

        <TextField
          value={query}
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
      <Grid item xs={2}>
        <Button
          disabled={query ? false : true}
          value={query}
          onClick={handleSubmit}
          size="large"
          variant="contained"
          color="primary"
        >
          search
        </Button>

      </Grid>
      <Grid item xs={2}>
        <Select
          onChange={handleSearchParameter}
          defaultValue="Book-Name"
          variant="outlined"
        >
          <MenuItem value="Author">
            Author
          </MenuItem>
          <MenuItem value="Book-Name">
            Book-Name
          </MenuItem>
        </Select>

      </Grid>
    </Grid>
  );
};

export default Search;
