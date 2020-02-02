import axios from 'axios';
const baseUrl = '/api/birds';

const getAll = async () => {
  const response = await axios.get (baseUrl);
  return response.data;
};

const create = async newObs => {
  let data = new FormData ();
  data.append ('image', newObs.image);
  delete newObs.image; // delete the image in newObs to prevent duplication

  for (const key in newObs) {
    // append all the keys to data
    data.append (key, newObs[key]);
  }

  const response = await axios.post (`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

//update takes in id and newObject to update the observation
const update = async (id, obs) => {
  const response = await axios.put (`${id}`, obs);
  return response.data;
};

const remove = async id => {
  const response = await axios.delete (`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
