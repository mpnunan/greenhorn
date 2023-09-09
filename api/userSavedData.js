import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserSaved = async (id) => {
  const userSaved = await axios.get(`${greenhornEndpoint}/userSaved.json?orderBy="submittedById"&equalTo="${id}"`);
  return Object.values(userSaved.data);
};

const getSingleUserSaved = async (id) => {
  const userSaved = await axios.get(`${greenhornEndpoint}/userSaved/${id}.json`);
  return userSaved.data;
};

const getCommunityUserSaved = async (communityId) => {
  const communityUserSaved = await axios.get(`${greenhornEndpoint}/userSaved.json?orderBy="communityId"&equalTo="${communityId}"`);
  return Object.values(communityUserSaved.data);
};

const createUserSaved = async (payload) => {
  const userSaved = await axios.post(`${greenhornEndpoint}/userSaved.json`, payload);
  return userSaved.data;
};

const updateUserSaved = async (payload) => {
  const revisedUserSaved = await axios.patch(`${greenhornEndpoint}/userSaved/${payload.id}.json`, payload);
  return revisedUserSaved.data;
};

const deleteUserSaved = async (id) => {
  const formerUserSaved = await axios.delete(`${greenhornEndpoint}/userSaved/${id}.json`);
  return formerUserSaved.data;
};

export {
  getUserSaved,
  getSingleUserSaved,
  getCommunityUserSaved,
  createUserSaved,
  updateUserSaved,
  deleteUserSaved,
};
