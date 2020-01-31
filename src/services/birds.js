import axios from 'axios';
const baseUrl = '/api/birds';

const getAll = async () => {
  const response = await axios.get (baseUrl);
  return response.data;
};

const create = async newObs => {
  const response = await axios.post (`${baseUrl}/${id}`, newBlog);
  return response.data;
};

//update takes in id and newObject to update the observation
const update = async (id, obs) => {
  const response = await axios.put (`${id}, obs`);
  return response.data;
};

const remove = async id => {
  const response = await axios.delete (`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
