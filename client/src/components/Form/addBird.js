/* eslint-disable no-alert */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import Form from './form';
import { createBird } from '../../redux/reducers/birdReducer';
import { usePosition } from '../../hooks/position';

const AddBird = ({ createBird, history }) => {
  const [bird, setBird] = useState({
    commonname: '',
    species: '',
    rarity: [],
    lat: 0,
    long: 0,
    date: '',
  });

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const { latitude, longitude } = usePosition();

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
    const birdImage = e.target.files[0];
    if (birdImage) {
      const resizedImage = await resizeFile(birdImage);
      setImage(resizedImage);
      setImageName(birdImage.name);
    }
  };

  function clearImage() {
    setImage(null);
    setImageName(null);
  }

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

  const addBird = async (e) => {
    e.preventDefault();
    try {
      createBird(bird, image);
    } catch (error) {
      console.log('error', error);
    }
    history.push('/');
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
        image={image}
        imageName={imageName}
        clearImage={clearImage}
        locationReset={locationReset}
        title="Enter new observation"
        redirectTo="/"
        uploadButton="upload"
      />
    </>
  );
};

export default connect(null, { createBird })(withRouter(AddBird));
