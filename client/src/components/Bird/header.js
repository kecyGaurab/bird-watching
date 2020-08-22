/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { removeBird } from '../../redux/reducers/birdReducer';
import ConfirmDialog from '../confirmDialog';

const Header = (props) => {
  const { history, location, bird, removeBird } = props;
  const { id } = bird;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRemove = () => {
    removeBird(id).then(history.push('/'));
  };
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={9}>
        <Typography variant="body1">{bird.commonname}</Typography>
      </Grid>
      {location.pathname === `/${id}` ? (
        <>
          <Grid item xs={1}>
            <Link to={`/${id}/edit`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => setConfirmOpen(true)}>
              <DeleteOutlinedIcon />
            </IconButton>
            <ConfirmDialog
              title="Delete Observation?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={handleRemove}
            >
              Are you sure you want to delete this observation?
            </ConfirmDialog>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default connect(null, { removeBird })(withRouter(Header));
