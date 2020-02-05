import React from 'react'
import {Dialog, DialogContent, DialogActions} from '@material-ui/core'
import Form from './form'
import {withRouter} from 'react-router'

const DialogForm = ({
  handleSubmit,
  handleChange,
  handleImageChange,
  handleRarityChange,
  handleLocation,
  bird,
}) => {
  return (
    <Dialog open fullScreen={true} disablePortal>
      <DialogContent>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleRarityChange={handleRarityChange}
          handleLocation={handleLocation}
          bird={bird}
        />
      </DialogContent>
    </Dialog>
  )
}

export default withRouter(DialogForm)
