import React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../utils/config';

const Map = ({ lat, long }) => {
  const [viewport, setViewport] = useState({
    width: '100',
    height: '70vh',
    latitude: lat,
    longitude: long,
    zoom: 8,
  });

  const checkIfCoordinatesChanged = lat !== viewport.latitude || long !== viewport.longitude;

  useEffect(() => {
    if (checkIfCoordinatesChanged) {
      setViewport((prevState) => ({
        ...prevState,
        latitude: lat,
        longitude: long,
      }));
    }
  }, [checkIfCoordinatesChanged, lat, long]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
        <PinDropIcon color="primary" />
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
