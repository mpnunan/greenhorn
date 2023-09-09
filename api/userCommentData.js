import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserComments = async (id) => {
  const userComments = await axios.get(`${greenhornEndpoint}/userComments.json?orderBy="submittedById"&equalTo="${id}"`);
  return Object.values(userComments.data);
};

const getSingleUserComment = async (id) => {
  const userComment = await axios.get(`${greenhornEndpoint}/userComments/${id}.json`);
  return userComment.data;
};

const getCommunityUserComments = async (communityId) => {
  const communityUserComments = await axios.get(`${greenhornEndpoint}/userComments.json?orderBy="communityId"&equalTo="${communityId}"`);
  return Object.values(communityUserComments.data);
};

const createUserComment = async (payload) => {
  const userComment = await axios.post(`${greenhornEndpoint}/userComments.json`, payload);
  return userComment.data;
};

const updateUserComment = async (payload) => {
  const revisedUserComment = await axios.patch(`${greenhornEndpoint}/userComments/${payload.id}.json`, payload);
  return revisedUserComment.data;
};

const deleteUserComment = async (id) => {
  const formerUserComment = await axios.delete(`${greenhornEndpoint}/userComments/${id}.json`);
  return formerUserComment.data;
};

export {
  getUserComments,
  getSingleUserComment,
  getCommunityUserComments,
  createUserComment,
  updateUserComment,
  deleteUserComment,
};
