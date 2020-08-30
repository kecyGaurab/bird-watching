/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  CardContent,
  Card,
  ButtonBase,
  CardHeader,
  CardMedia,
  TableBody,
  TableCell,
  TableRow,
  Table,
  Typography,
  Box,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import * as moment from 'moment';
import Header from './header';

const Bird = (props) => {
  const { bird, location } = props;

  const formattedDate = (date) => {
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm a');
  };

  function birdLocation() {
    if (bird && bird.lat === 0) {
      return 'Not added';
    }
    return `${bird.lat.toFixed(2)}N, ${bird.long.toFixed(2)}E `;
  }

  function createData(categories, values) {
    return { categories, values };
  }

  const rows = [
    createData('Species', `${bird.species}`),
    createData('Rarity', `${bird.rarity}`),
    createData('Time', `${formattedDate(bird.date)}`),
    createData('Location', `${birdLocation()}`),
  ];

  return (
    <>
      <Card style={{ height: '495px' }} elevation={10}>
        <CardHeader title={<Header bird={bird} />} />
        <CardMedia image={bird.imageUrl} />
        <CardContent>
          <Table container="paper" size="small">
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Box fontWeight="fontWeightBold">{row.categories}</Box>
                  </TableCell>
                  <TableCell align="left">{row.values}</TableCell>
                </TableRow>
              ))}
              {location.pathname === '/' ? (
                <TableRow>
                  <TableCell>
                    <Link underline="none" to={`/${bird.id}`}>
                      Details
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      Added by &nbsp;
                      {bird.username}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default withRouter(Bird);
