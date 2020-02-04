import React, {useState, useEffect, Fragment} from 'react';
import Resizer from 'react-image-file-resizer';
import {Container, CssBaseline, Grid, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import NavBar from './components/navBar';
import Form from './components/Form/form';
import Bird from './components/Bird/bird';
import {usePosition} from './hooks/position';
import birdsService from './services/birds';
import * as moment from 'moment';

const App = () => {
  const [bird, setBird] = useState ({
    commonname: '',
    species: '',
    rarity: [],
    location: [null, null],
    date: '',
  });

  const [image, setImage] = useState (null);
  const [open, setOpen] = useState (false);
  const [birds, setBirds] = useState ([]);
  const [error, setError] = useState (false);
  const [message, setMessage] = useState ('');

  const {latitude, longitude} = usePosition ();

  useEffect (() => {
    birdsService.getAll ().then (birds => {
      setBirds (birds);
    });
  }, []);

  console.log ('birds :', birds);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen (false);
  };

  const handleRemove = id => {
    const deleted = birds.filter (contact => contact.id !== id);
    const birdToRemove = birds.find (n => n.id === id);
    if (
      window.confirm (
        `Are you sure you want to delete ${birdToRemove.commonname} ?`
      )
    ) {
      birdsService.remove (id).then (setBirds (deleted));
    }
  };

  const resetFields = () => {
    setBird ({
      commonname: '',
      species: '',
      rarity: [],
      location: [null, null],
    });
    setImage (null);
  };

  const handleChange = e => {
    setBird ({
      ...bird,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault ();
    birdsService
      .create (bird, image)
      .then (res => {
        setBirds (birds.concat (res));
        setMessage ('Observation saved');
        setOpen (true);
      })
      .catch (error => {
        setError (true);
        setMessage (error.response.data.error);
        setOpen (true);
        setTimeout (() => {
          setError (false);
        }, 5000);
      });
    resetFields ();
  };

  const handleRarityChange = e => {
    setBird ({
      ...bird,
      rarity: e.target.value,
    });
  };

  const resizeFile = file =>
    new Promise (resolve => {
      Resizer.imageFileResizer (
        file,
        200,
        300,
        'JPEG',
        100,
        0,
        uri => {
          resolve (uri);
        },
        'blob'
      );
    });

  const handleImageChange = async e => {
    e.preventDefault ();
    let birdImage = e.target.files[0];
    let resizedImage = await resizeFile (birdImage);
    console.log ('resizedImage :', resizedImage);

    setImage (resizedImage);
  };

  const handleLocation = e => {
    e.preventDefault ();

    if (window.confirm ('Are you sure you want to add location?'))
      setBird ({...bird, location: [latitude, longitude]});
  };

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const sortedBirds = birds.sort (
    (a, b) => new Date (b.date) - new Date (a.date)
  );

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
          spacing={3}
        >

          <Grid item xs={12}>
            <Snackbar
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              {error
                ? <Alert onClose={handleClose} severity="error">
                    {message}
                  </Alert>
                : <Alert onClose={handleClose} severity="success">
                    {message}
                  </Alert>}
            </Snackbar>
          </Grid>
          <Grid item xs={12} md={3}>

            <Form
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleRarityChange={handleRarityChange}
              handleLocation={handleLocation}
              bird={bird}
            />
          </Grid>
          {sortedBirds &&
            sortedBirds.map ((bird, index) => (
              <Grid key={index} item xs={12} md={3}>
                <Bird handleRemove={handleRemove} bird={bird} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default App;
