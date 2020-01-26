import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import SearchIcon from '@material-ui/icons/Search';
import Search from './search'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

const NavBar = ({handleSearch, handleSearchParameter}) => (
  <>
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={5}>
            <Typography fontWeight="" variant="h3">
              <LibraryBooksIcon fontSize="large" />
              BOOKS FOR YOU
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Search
              handleSearch={handleSearch}
              handleSearchParameter={handleSearchParameter}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
)

export default NavBar
