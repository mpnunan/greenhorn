import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserCommunities = async (userId) => {
  const userCommunities = await axios.get(`${greenhornEndpoint}/userCommunities.json?orderBy="userId"&equalTo="${userId}"`);
  return Object.values(userCommunities.data);
};

const getSingleUserCommunity = async (id) => {
  const userCommunity = await axios.get(`${greenhornEndpoint}/userCommunities/${id}.json`);
  return userCommunity.data;
};

const getCommunityUserCommunities = async (communityId) => {
  const communityUsers = await axios.get(`${greenhornEndpoint}/userCommunities.json?orderBy="communityId"&equalTo="${communityId}"`);
  return Object.values(communityUsers.data);
};

const getAllCommunityAdmins = async () => {
  const allCommunityAdmins = await axios.get(`${greenhornEndpoint}/userCommunities.json?orderBy="isAdmin"&equalTo=true`);
  return Object.values(allCommunityAdmins.data);
};

const createUserCommunity = async (payload) => {
  const userCommunity = await axios.post(`${greenhornEndpoint}/userCommunities.json`, payload);
  return userCommunity.data;
};

const updateUserCommunity = async (payload) => {
  const revisedUserCommunity = await axios.patch(`${greenhornEndpoint}/userCommunities/${payload.id}.json`, payload);
  return revisedUserCommunity.data;
};

const deleteUserCommunity = async (id) => {
  const formerUserCommunity = await axios.delete(`${greenhornEndpoint}/userCommunities/${id}.json`);
  return formerUserCommunity.data;
};

export {
  getUserCommunities,
  getSingleUserCommunity,
  getCommunityUserCommunities,
  getAllCommunityAdmins,
  createUserCommunity,
  updateUserCommunity,
  deleteUserCommunity,
};
