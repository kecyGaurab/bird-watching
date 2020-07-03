import React from 'react';
import GoogleMapReact from 'google-map-react';

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
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBzFco2Inn3XVVM-Z7eEc-EybtTXAVwMGU' }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      />
    </div>
  );
};

export default GoogleMap;
