import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserSaved = async (userId) => {
  const userSaved = await axios.get(`${greenhornEndpoint}/userSaved.json?orderBy="userId"&equalTo="${userId}"`);
  return Object.values(userSaved.data);
};

const getPostSaved = async (id) => {
  const postSaved = await axios.get(`${greenhornEndpoint}/userSaved.json?orderBy="submissionId"&equalTo="${id}"`);
  return Object.values(postSaved.data);
};

const getSingleUserSaved = async (id) => {
  const userSaved = await axios.get(`${greenhornEndpoint}/userSaved/${id}.json`);
  return userSaved.data;
};

const createUserSaved = async (payload) => {
  const userSaved = await axios.post(`${greenhornEndpoint}/userSaved.json`, payload);
  return userSaved.data;
};

const updateUserSaved = async (id, payload) => {
  const revisedUserSaved = await axios.patch(`${greenhornEndpoint}/userSaved/${id}.json`, payload);
  return revisedUserSaved.data;
};

const deleteUserSaved = async (id) => {
  const formerUserSaved = await axios.delete(`${greenhornEndpoint}/userSaved/${id}.json`);
  return formerUserSaved.data;
};

export {
  getUserSaved,
  getPostSaved,
  getSingleUserSaved,
  createUserSaved,
  updateUserSaved,
  deleteUserSaved,
};
