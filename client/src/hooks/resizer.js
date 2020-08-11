/* eslint-disable no-new */
/* eslint-disable no-undef */
import Resizer from 'react-image-file-resizer';

const useResizer = (file) => {
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
};

export default useResizer;
