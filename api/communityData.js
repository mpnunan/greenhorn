import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getAllCommunities = async () => {
  const communities = await axios.get(`${greenhornEndpoint}/communities.json`);
  return Object.values(communities.data);
};

const getSingleCommunity = async (id) => {
  const community = await axios.get(`${greenhornEndpoint}/communities/${id}.json`);
  return community.data;
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

const getCommunitySubmissions = async (id) => {
  const communitySubmissions = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="communityId"&equalTo="${id}"`);
  return Object.values(communitySubmissions.data);
};

export {
  getAllCommunities,
  getSingleCommunity,
  getMultiCommunities,
  getCommunitySubmissions,
};
