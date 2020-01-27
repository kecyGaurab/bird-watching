import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import {Snackbar} from '@material-ui/core'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Error = ({open, handleClose, errorMessage}) => {
  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default Error
