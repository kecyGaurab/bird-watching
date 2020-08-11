/* eslint-disable no-alert */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import Form from '../components/Form/form';
import { editBird } from '../redux/reducers/birdReducer';
import { usePosition } from '../hooks/position';

const EditBird = (props) => {
  const { latitude, longitude } = usePosition();
  console.log('latitude', latitude);

  const { match, bird, history } = props;
  const { id } = match.params;
  const { commonname, species, rarity, image: imageUrl, lat, long } = bird;

  const [, setImage] = useState(null);

  const [birdToEdit, setBirdToEdit] = useState({
    commonname,
    species,
    rarity,
    lat: lat === undefined ? 0 : lat,
    long: long === undefined ? 0 : long,
    imageUrl,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setBirdToEdit({
      ...birdToEdit,
      [e.target.name]: e.target.value,
    });
  };

  console.log('birdToEdit', birdToEdit);

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
    setImage(resizedImage);
  };

  const handleEditSubmit = () => {
    props.editBird(id, birdToEdit).then(history.push(`/${id}`));
  };

  return (
    <>
      <Form
        onSubmit={handleEditSubmit}
        handleChange={handleChange}
        handleRarityChange={handleRarityChange}
        handleImageChange={handleImageChange}
        handleLocation={handleLocation}
        bird={birdToEdit}
        locationReset={locationReset}
        title="Edit observation"
        redirectTo={`/${id}`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bird: state.observations.bird,
  };
};

export default connect(mapStateToProps, { editBird })(withRouter(EditBird));
