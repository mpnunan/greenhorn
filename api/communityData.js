import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getAllCommunities = async () => {
  const communities = await axios.get(greenhornEndpoint);
  return communities;
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

export {
  getAllCommunities,
  getSingleCommunity,
  getMultiCommunities,
};
