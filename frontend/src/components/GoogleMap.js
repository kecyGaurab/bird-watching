import React from 'react';
import GoogleMapReact from 'google-map-react';
import { REACT_APP_GOOGLE_API_KEY } from '../utils/config';

const GoogleMap = (props) => {
  const { latitude, longitude } = props;

  const renderMarkers = (map, maps) => {
    const marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'Hello World!',
    });
    return marker;
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '495px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      />
    </div>
  );
};

export default GoogleMap;
