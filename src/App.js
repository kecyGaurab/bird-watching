import React, {useState, useEffect, Fragment} from 'react';

import {Container, CssBaseline, Grid} from '@material-ui/core';
import NavBar from './components/navBar';
import Form from './components/form';
import Bird from './components/bird';
import {usePosition} from './hooks/position';

const App = () => {
  const [bird, setBird] = useState ({
    name: '',
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
    setBirds ([...birds, bird]);
    sessionStorage.setItem ('data', JSON.stringify (bird));
  };

  const handleRarityChange = e => {
    setBird ({
      ...bird,
      rarity: e.target.value,
    });
  };

  const handleImageChange = e => {
    e.preventDefault ();
    let image = URL.createObjectURL (e.target.files[0]);
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
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleRarityChange={handleRarityChange}
          handleLocation={handleLocation}
          bird={bird}
          location={bird.location}
        />
        {birds &&
          birds.map (bird => (
            <Grid key={bird.name} container>
              <Bird bird={bird} />
            </Grid>
          ))}
      </Container>
    </Fragment>
  );
};

export default App;
