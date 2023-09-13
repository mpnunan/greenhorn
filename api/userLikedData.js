import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserLiked = async (userId) => {
  const userLiked = await axios.get(`${greenhornEndpoint}/userLiked.json?orderBy="userId"&equalTo="${userId}"`);
  return Object.values(userLiked.data);
};

const getPostLiked = async (id) => {
  const postLiked = await axios.get(`${greenhornEndpoint}/userLiked.json?orderBy="submissionId"&equalTo="${id}"`);
  return Object.values(postLiked.data);
};

const getSingleUserLiked = async (id) => {
  const userLiked = await axios.get(`${greenhornEndpoint}/userLiked/${id}.json`);
  return userLiked.data;
};

const createUserLiked = async (payload) => {
  const userLiked = await axios.post(`${greenhornEndpoint}/userLiked.json`, payload);
  return userLiked.data;
};

const updateUserLiked = async (payload) => {
  const revisedUserLiked = await axios.patch(`${greenhornEndpoint}/userLiked/${payload.id}.json`, payload);
  return revisedUserLiked.data;
};

const deleteUserLiked = async (id) => {
  const formerUserLiked = await axios.delete(`${greenhornEndpoint}/userLiked/${id}.json`);
  return formerUserLiked.data;
};

export {
  getUserLiked,
  getPostLiked,
  getSingleUserLiked,
  createUserLiked,
  updateUserLiked,
  deleteUserLiked,
};
