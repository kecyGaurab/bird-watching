/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, Typography, Grid, CardContent, Paper } from '@material-ui/core';
import * as moment from 'moment';
import styled from 'styled-components';
import Header from './header';
import { StyledCard } from '../styledComponents';

const Image = styled.div`
  height: 180px important!;
  padding: 10px 0px;
`;

const SCard = styled(Paper)`
  height: 190px;
`;

const Bird = ({ bird, handleRemove }) => {
  // const imagePath = bird.image && bird.image.replace(/\\/g, '/');
  const formattedDate = (date) => {
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <>
      <StyledCard elevation={10}>
        <CardContent>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Header bird={bird} handleRemove={handleRemove} />
            </Grid>
            <Grid item>
              <Typography variant="inherit">
                Species:&nbsp;
                {bird.species}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="inherit">
                Rarity:&nbsp;
                {bird.rarity}
              </Typography>
            </Grid>
            <Grid item>
              <SCard align="center" variant="outlined">
                <Image>
                  <img alt="bird" src={`uploads/${bird.image}`} />
                </Image>
              </SCard>
            </Grid>
            <Grid item>
              <Typography variant="h6">Observation info:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="inherit">
                Date and Time:&nbsp;
                {formattedDate(bird.date)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="inherit">
                Location:&nbsp;
                {bird.latitude && `${bird.latitude.toFixed(2)}N, ${bird.longitude.toFixed(2)}E `}
              </Typography>
            </Grid>
            <Grid item>
              <Link href={`https://en.wikipedia.org/wiki/${bird.commonname}`}>
                Link to wikipedia page
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default Bird;
