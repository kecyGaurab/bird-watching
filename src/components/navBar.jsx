import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField'
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

const NavBar = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={1}>
            {/* <LibraryBooksIcon fontSize="large" /> */}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">BOOKS FOR YOU</Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              style={{color: 'white'}}
              fullWidth
              size="medium"
              id="outlined-search"
              label="Search field"
              type="search"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
)

export default NavBar
