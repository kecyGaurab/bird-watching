/* eslint-disable camelcase */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import Form from './Form';
import { editBird } from '../../redux/reducers/birdReducer';
import { usePosition } from '../../hooks/Position';

const EditBird = ({ match, history }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.currentUser.token);
  const bird = useSelector((state) => state.observations.bird);
  const { latitude, longitude } = usePosition();

  const { id } = match.params;
  const { commonname, species, rarity, lat, long, public_id, version, imageUrl } = bird;

  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [imageName, setImageName] = useState('');

  const [birdToEdit, setBirdToEdit] = useState({
    commonname,
    species,
    rarity,
    lat: lat === undefined ? 0 : lat,
    long: long === undefined ? 0 : long,
    public_id,
    imageUrl,
    version,
    date: bird.date,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setBirdToEdit({
      ...birdToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setBirdToEdit({
      ...birdToEdit,
      date,
    });
  };

  const handleRarityChange = (e) => {
    setBirdToEdit({
      ...birdToEdit,
      rarity: e.target.value,
    });
  };

  function locationReset() {
    setBirdToEdit({
      ...birdToEdit,
      lat: 0,
      long: 0,
    });
  }

  const handleLocation = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to add location?')) {
      setBirdToEdit({
        ...birdToEdit,
        lat: latitude,
        long: longitude,
      });
    }
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
    setImageToUpdate(resizedImage);
    setImageName(birdImage.name);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editBird(id, birdToEdit, imageToUpdate, token)).then(history.push(`/${id}`));
  };

  return (
    <>
      <Form
        onSubmit={handleEditSubmit}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleRarityChange={handleRarityChange}
        handleImageChange={handleImageChange}
        handleLocation={handleLocation}
        bird={birdToEdit}
        imageName={imageName}
        locationReset={locationReset}
        title="Edit observation"
        redirectTo={`/${id}`}
        uploadButton="change image"
      />
    </>
  );
};

export default withRouter(EditBird);
