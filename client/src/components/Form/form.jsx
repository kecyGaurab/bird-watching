import React from 'react'
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
} from '@material-ui/core'
import FileUpload from './file-upload'

const Form = ({
  handleSubmit,
  handleChange,
  handleImageChange,
  handleRarityChange,
  handleLocation,

  bird,
}) => {
  return (
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
                defaultValue={'common'}
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
              <Button variant="outlined">Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Form
