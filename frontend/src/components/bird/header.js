/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { removeBird } from '../../redux/reducers/birdReducer';
import ConfirmDialog from '../confirmDialog';

const Header = (props) => {
  let token = null;
  let username = null;
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    token = currentUser.token;
    username = currentUser.username;
  }
  const { history, location, bird, removeBird } = props;
  const { id } = bird;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleRemove = async () => {
    try {
      await removeBird(id, token);
    } catch (error) {
      console.log('error', error);
    }
    history.push('/');
  };
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={9}>
        <Typography variant="body1">{bird.commonname}</Typography>
      </Grid>
      {location.pathname === `/${id}` && bird.username === username ? (
        <>
          <Grid item xs={1}>
            <Link data-testid="edit-bird" to={`/${id}/edit`}>
              <IconButton >
                <EditIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <IconButton data-testid="delete-bird" onClick={() => setConfirmOpen(true)}>
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
