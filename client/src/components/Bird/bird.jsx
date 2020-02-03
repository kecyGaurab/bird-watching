import React from 'react'
import {Link, Typography, Grid, CardContent} from '@material-ui/core'
import styled from 'styled-components'
import {StyledCard} from '../styledComponents'
import Header from './header'
import * as moment from 'moment'

const Image = styled.div`
  height: 200px;
  padding: 10px 0px;
`

const Bird = ({bird, handleRemove}) => {
  const formattedDate = date => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }

  return (
    <StyledCard elevation={10}>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Header bird={bird} handleRemove={handleRemove} />
          </Grid>

          <Grid item>
            <Typography variant="body2">Species: {bird.species}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Rarity: {bird.rarity}</Typography>
          </Grid>
          <Grid item>
            <Image>
              <img alt="bird" src={bird.image} />
            </Image>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              Observed date and time: {formattedDate(bird.date)}
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
  )
}

export default Bird
