import React, {useState, useEffect, Fragment} from 'react';

import {Container, CssBaseline, Grid} from '@material-ui/core';
import NavBar from './components/navBar';
import Form from './components/form';
import Bird from './components/bird';
import {usePosition} from './hooks/position';
import birdsService from './services/birds';

const App = () => {
  const [bird, setBird] = useState ({
    commonname: '',
    species: '',
    rarity: [],
    image: null,
    location: [null, null],
  });

  const [birds, setBirds] = useState ([]);

  const {latitude, longitude, error} = usePosition ();
  const handleChange = e => {
    setBird ({
      ...bird,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault ();
    birdsService
      .create (bird)
      .then (res => {
        console.log ('res.data :', res.data);
      })
      .catch (error => {
        console.log ('error :', error);
      });
    // sessionStorage.setItem ('data', JSON.stringify (bird));
  };

  useEffect (() => {
    birdsService.getAll ().then (b => {
      setBirds (b);
    });
  }, []);

  const handleRarityChange = e => {
    setBird ({
      ...bird,
      rarity: e.target.value,
    });
  };

  const handleImageChange = e => {
    e.preventDefault ();
    let image = e.target.files[0];
    setBird ({...bird, image: image});
  };

  const handleLocation = e => {
    e.preventDefault ();
    setBird ({...bird, location: [latitude, longitude]});
  };

  const birdData = sessionStorage.getItem ('data');
  console.log ('birddata', birdData);

  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <Container>
        <Grid
          key={bird.name}
          justify="space-around"
          container
          direction="row"
          spacing={6}
        >
          <Grid item xs={12}>

            <Form
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleRarityChange={handleRarityChange}
              handleLocation={handleLocation}
              bird={bird}
              location={bird.location}
            />
          </Grid>
          {birds &&
            birds.map ((bird, index) => (
              <Grid key={index} item xs={3}>
                <Bird bird={bird} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default App;
