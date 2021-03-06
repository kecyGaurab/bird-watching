import axios from 'axios';

const baseUrl = '/api/birds';

// get the token and adds 'bearer' string
const setToken = (newToken) => {
  return `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObs, image, token) => {
  const newToken = setToken(token);
  const data = new FormData();
  data.append('image', image);

  for (const key in newObs) {
    // append all the keys to data
    data.append(key, newObs[key]);
  }

  const config = {
    headers: { authorization: newToken },
  };
  const response = await axios.post(`${baseUrl}`, data, config);
  return response.data;
};
// update takes in id and newObject to update the observation
const update = async (id, birdToEdit, imageToUpdate, token) => {
  const newToken = setToken(token);
  const config = {
    headers: { authorization: newToken },
  };
  const data = new FormData();
  if (imageToUpdate !== null) {
    data.append('imageToUpdate', imageToUpdate);
  }

  for (const key in birdToEdit) {
    // append all the keys to data
    data.append(key, birdToEdit[key]);
  }
  const response = await axios.put(`${baseUrl}/${id}`, data, config);
  return response.data;
};

const remove = async (id, token) => {
  const newToken = setToken(token);
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: newToken,
    },
  });
  return response.data;
};

export default {
  get,
  getAll,
  create,
  remove,
  update,
  setToken,
};
