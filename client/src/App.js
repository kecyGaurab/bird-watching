/* eslint-disable react/jsx-indent */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import {
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  Dialog,
  Button,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import NavBar from './components/navBar';
import Form from './components/Form/form';
import Bird from './components/Bird/bird';
import { usePosition } from './hooks/position';
import birdsService from './services/birds';

const App = () => {
  const [bird, setBird] = useState({
    commonname: '',
    species: '',
    rarity: [],
    location: [null, null],
    date: '',
  });

  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [birds, setBirds] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { latitude, longitude } = usePosition();

  useEffect(() => {
    birdsService.getAll().then((response) => {
      setBirds(response);
    });
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      const matchedBirds = birds.filter((n) =>
        n.commonname.toLowerCase().startsWith(query.toLowerCase()),
      );
      setFilteredBirds(matchedBirds);
    };
    handleFilter();
  }, [query, birds]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleRemove = (id) => {
    const deleted = birds.filter((contact) => contact.id !== id);
    const birdToRemove = birds.find((n) => n.id === id);
    if (window.confirm(`Are you sure you want to delete ${birdToRemove.commonname} ?`)) {
      birdsService.remove(id).then(setBirds(deleted));
    }
  };

  const resetFields = () => {
    setBird({
      commonname: '',
      species: '',
      rarity: [],
      location: [null, null],
    });
    setImage(null);
  };

  const handleChange = (e) => {
    setBird({
      ...bird,
      [e.target.name]: e.target.value,
    });
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    birdsService
      .create(bird, image)
      .then((res) => {
        setBirds(birds.concat(res));
        setMessage('Observation saved');
        setOpen(true);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.error);
        setOpen(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
    resetFields();
    setDialogOpen(false);
  };

  const handleRarityChange = (e) => {
    setBird({
      ...bird,
      rarity: e.target.value,
    });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'blob',
      );
    });

  const handleImageChange = async (e) => {
    e.preventDefault();
    const birdImage = e.target.files[0];
    const resizedImage = await resizeFile(birdImage);

    setImage(resizedImage);
  };

  const handleLocation = (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to add location?'))
      setBird({
        ...bird,
        location: [latitude.toFixed(2), longitude.toFixed(2)],
      });
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const sortedBirds = birds.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <CssBaseline />
      <NavBar query={query} handleQueryChange={handleQueryChange} />
      <Dialog open={dialogOpen} disablePortal disableEnforceFocus>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            <CloseIcon />
          </Button>
        </DialogActions>
        <DialogContent>
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleRarityChange={handleRarityChange}
            handleLocation={handleLocation}
            bird={bird}
          />
        </DialogContent>
      </Dialog>
      <Container>
        <Grid key={bird.name} justify="space-around" container direction="row" spacing={3}>
          <Grid item xs={12}>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              {error ? (
                <Alert onClose={handleClose} severity="error">
                  {message}
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="success">
                  {message}
                </Alert>
              )}
            </Snackbar>
          </Grid>
          <Grid item xs={11}>
            <Button variant="outlined" onClick={() => setDialogOpen(true)}>
              Add New
            </Button>
          </Grid>
          {filteredBirds
            ? filteredBirds.map((b) => (
                <Grid key={b.id} item xs={12} md={3}>
                  <Bird handleRemove={handleRemove} bird={b} />
                </Grid>
              ))
            : sortedBirds &&
              sortedBirds.map((b) => (
                <Grid key={b.id} item xs={12} md={3}>
                  <Bird handleRemove={handleRemove} bird={b} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
