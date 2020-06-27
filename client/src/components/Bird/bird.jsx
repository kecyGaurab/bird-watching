/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, Typography, Grid, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import * as moment from 'moment';
import { StyledCard } from '../styledComponents';
import Header from './header';

const Image = styled.div`
  height: 180px;
  padding: 10px 0px;
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
              <Typography variant="body2">
                Species:
                {bird.species}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Rarity:
                {bird.rarity}
              </Typography>
            </Grid>
            <Grid item>
              <Image>
                <img alt="bird" src={`uploads/${bird.image}`} />
              </Image>
            </Grid>
            <Grid item>
              <Typography variant="h6">Observation info:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Date and Time:
                {formattedDate(bird.date)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                location:
                {bird.location && `${bird.location[0]}N  ${bird.location[0]}E}`}
              </Typography>
            </Grid>
            <Link href={`https://en.wikipedia.org/wiki/${bird.commonname}`}>
              Link to wikipedia page
            </Link>
          </Grid>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default Bird;
