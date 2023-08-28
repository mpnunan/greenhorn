import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getAllCommunities = async () => {
  const communities = await axios.get(greenhornEndpoint);
  return communities;
};

const getUserCommunities = async (uid) => {
  const userCommunities = await axios.get(`${greenhornEndpoint}/communities.json?orderBy="uid"&equalTo="${uid}"`);
  return userCommunities;
};

const getSingleCommunity = async (id) => {
  const community = await axios.get(`${greenhornEndpoint}/communities/${id}.json`);
  return community;
};

const getMultiCommunities = async (...idArray) => {
  const communityArray = [];
  idArray.forEach((id) => {
    getSingleCommunity(id)
      .then((community) => {
        communityArray.push(community);
      });
  });
  return communityArray;
};

const getUserMultiCommunities = async (uid) => {
  const userCommunities = await getUserCommunities(uid);
  const userMultiCommunities = await getMultiCommunities(userCommunities);
  return userMultiCommunities;
};

export {
  getAllCommunities,
  getUserCommunities,
  getSingleCommunity,
  getMultiCommunities,
  getUserMultiCommunities,
};
