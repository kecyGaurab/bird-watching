import {useState, useEffect} from 'react';
export const usePosition = () => {
  const [position, setPosition] = useState ({});
  const [navError, setError] = useState (null);

  const onChange = ({coords}) => {
    setPosition ({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = error => {
    setError (error.message);
  };
  useEffect (() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError ('Geolocation is not supported');
      return;
    }
    let watcher = geo.watchPosition (onChange, onError);
    return () => geo.clearWatch (watcher);
  }, []);
  return {...position, navError};
};
