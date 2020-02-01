import axios from 'axios';
const baseUrl = '/api/birds';

const getAll = async () => {
  const response = await axios.get (baseUrl);
  return response.data;
};

const create = async newObs => {
  let data = new FormData ();
  data.append ('newObs', newObs.image);
  const response = await axios.post (`${baseUrl}`, data, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
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
