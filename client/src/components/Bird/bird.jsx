/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Typography,
  Grid,
  CardContent,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import * as moment from 'moment';
import styled from 'styled-components';
import { StyledCard } from '../styledComponents';
import Header from './header';

export const Image = styled.div`
  height: 180px important!;
  padding: 10px 0px;
`;

export const SCard = styled(Paper)`
  height: 210px;
`;

const Bird = (props) => {
  const { bird, location } = props;

  const formattedDate = (date) => {
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a');
  };

  function birdLocation() {
    if (bird && bird.latitude === 0) {
      return 'Not available';
    }
    return `${bird.latitude.toFixed(2)}N, ${bird.longitude.toFixed(2)}E `;
  }

  const birdSpecies = (
    <Box fontStyle="italic">
      <Typography variant="inherit">
        Species:&nbsp;
        {bird.species}
      </Typography>
    </Box>
  );

  return (
    <>
      <StyledCard elevation={10}>
        <CardContent>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Header bird={bird} />
            </Grid>
            <Grid item>
              <SCard align="center" variant="outlined">
                <Image>
                  <img alt="bird" src={`uploads/${bird.image}`} />
                </Image>
              </SCard>
            </Grid>
            <List dense>
              <ListItem>
                <ListItemText primary={birdSpecies} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Rarity: ${bird.rarity}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Time : ${formattedDate(bird.date)}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Location: ${birdLocation()}`} />
              </ListItem>
              <ListItem>
                {location.pathname === '/' ? (
                  <Link style={{ textDecoration: 'none' }} to={`/${bird.id}`}>
                    <ListItemText primary="Details" />
                  </Link>
                ) : null}
              </ListItem>
            </List>
            {/* <Grid item>
              <Box fontStyle="italic">
                <Typography variant="inherit">
                  Species:&nbsp;
                  {bird.species}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="inherit">
                Rarity:&nbsp;
                {bird.rarity}
              </Typography>
            </Grid> */}
            {/* <Grid item>
              <Typography variant="h6">Observation info:</Typography>
            </Grid> */}
            {/* <Grid item>
              <Typography variant="inherit">
                Date and Time:&nbsp;
                {formattedDate(bird.date)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="inherit">
                Location:&nbsp;
                {bird && bird.latitude === 0
                  ? 'Not available'
                  : `${bird.latitude.toFixed(2)}N, ${bird.longitude.toFixed(2)}E `}
              </Typography>
            </Grid> */}
            {/* <Grid item align="stretch">
              {location.pathname === '/' ? <Link to={`/${bird.id}`}>Details</Link> : null}
            </Grid> */}
          </Grid>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default withRouter(Bird);
