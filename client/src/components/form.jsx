import React from 'react'
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
  Input,
} from '@material-ui/core'

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
          <Grid container direction="column" spacing={2}>
            <Grid item xs={2}>
              <Typography variant="h6">Enter new observation</Typography>
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
            <Grid item xs={3}>
              <label htmlFor="avatar">Upload image:</label>
              <Input
                onChange={handleImageChange}
                type="file"
                accept="image/png, image/jpeg,image/jpg"
              />
            </Grid>
            <Grid item>
              <Button onClick={handleLocation}>
                {bird.location ? 'Add location' : 'Remove location'}
              </Button>
              <Typography>{bird.location}</Typography>
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
  )
}

export default Form
