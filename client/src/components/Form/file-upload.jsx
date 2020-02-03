import React from 'react'
import {Grid, Input, InputLabel, IconButton} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const FileUpload = ({handleImageChange, bird}) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
    >
      <Grid item xs={9}>
        <InputLabel>Upload image:</InputLabel>
        <Input
          value={bird.image}
          onChange={handleImageChange}
          type="file"
          accept="image/png, image/jpeg,image/jpg"
        />
      </Grid>
      <Grid item xs={3}>
        <IconButton>
          <CancelIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default FileUpload
