/* eslint-disable no-alert */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import Form from './form';
import { createBird } from '../../redux/reducers/birdReducer';
import { usePosition } from '../../hooks/position';

const AddBird = (props) => {
  const [bird, setBird] = useState({
    commonname: '',
    species: '',
    rarity: [],
    lat: 0,
    long: 0,
    date: '',
  });

  const [image, setImage] = useState(null);
  const { latitude, longitude } = usePosition();

  console.log('latitude', latitude);

  const handleChange = (e) => {
    e.preventDefault();
    setBird({
      ...bird,
      [e.target.name]: e.target.value,
    });
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
        190,
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

  function locationReset() {
    setBird({
      ...bird,
      lat: 0,
      long: 0,
    });
  }

  const handleLocation = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to add location?'))
      setBird({
        ...bird,
        lat: latitude,
        long: longitude,
      });
  };

  const addBird = () => {
    props.createBird(bird, image).then(props.history.push('/'));
  };

  return (
    <>
      <Form
        onSubmit={addBird}
        handleChange={handleChange}
        handleRarityChange={handleRarityChange}
        handleImageChange={handleImageChange}
        handleLocation={handleLocation}
        bird={bird}
        locationReset={locationReset}
        title="Enter new observation"
        redirectTo="/"
      />
    </>
  );
};

export default connect(null, { createBird })(withRouter(AddBird));
