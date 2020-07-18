/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IconButton, Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { removeBird } from '../../redux/reducers/birdReducer';

const Header = ({ bird, ...props }) => {
  console.log('props', props);
  const { id } = bird;

  const handleRemove = async () => {
    return props.removeBird(id);
  };
  const handleEdit = () => {
    console.log('edit clicked');
  };
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={9}>
        <Typography variant="body1">
          Common name: &nbsp;
          {bird.commonname}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleEdit(bird.id)}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleRemove(id)}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default connect(null, { removeBird })(Header);
