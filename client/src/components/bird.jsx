import React from "react";
import { Typography, Grid, Card, CardContent } from "@material-ui/core";

const Bird = ({ bird }) => {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6">{bird.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{bird.species}</Typography>
          </Grid>
          <Grid item>
            <Typography>{bird.rarity}</Typography>
          </Grid>
          <Grid item>
            <img alt="bird" src={bird.image} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Bird;
