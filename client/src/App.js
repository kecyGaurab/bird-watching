/* eslint-disable react/jsx-indent */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import { CssBaseline } from '@material-ui/core';
import NavBar from './components/navBar';
import Form from './components/Form/form';
import HomePage from './pages/HomePage';
import { usePosition } from './hooks/position';
import birdsService from './services/birds';
import BirdDetail from './pages/BirdDetail';
import EditBird from './pages/EditBird';

const App = (props) => {
  const [bird, setBird] = useState({
    commonname: '',
    species: 'unknown',
    rarity: [],
    latitude: 0,
    longitude: 0,
    date: '',
  });

  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [birds, setBirds] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
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
      props.history.push('/');
    }
  };

  const resetFields = () => {
    setBird({
      commonname: '',
      species: 'unknown',
      rarity: [],
      latitude: 0,
      longitude: 0,
    });
    setImage(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
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
    props.history.push('/');
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
        240,
        240,
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
        latitude,
        longitude,
      });
  };

  const handleEdit = (id) => {
    props.history.push(`/edit/${id}`);
  };

  const sortedBirds = birds.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <CssBaseline />
      <NavBar query={query} handleQueryChange={handleQueryChange} />
      <Route
        exact
        path="/"
        render={() => (
          <HomePage
            {...props}
            handleClose={handleClose}
            handleRemove={handleRemove}
            filteredBirds={filteredBirds}
            message={message}
            error={error}
            sortedBirds={sortedBirds}
          />
        )}
      />
      <Switch>
        <Route
          path="/add"
          render={() => (
            <Form
              {...props}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleRarityChange={handleRarityChange}
              handleLocation={handleLocation}
              open={open}
              bird={bird}
            />
          )}
        />
        {birds && (
          <Route
            path="/edit/:id"
            render={() => (
              <EditBird
                {...props}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleRarityChange={handleRarityChange}
                handleLocation={handleLocation}
                open={open}
                birds={birds}
              />
            )}
          />
        )}
        <Route
          path="/:id"
          render={() => (
            <BirdDetail
              {...props}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              birds={birds}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default withRouter(App);
