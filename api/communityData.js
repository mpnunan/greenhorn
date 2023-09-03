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

const createCommunity = async (payload) => {
  const newCommunity = await axios.post(`${greenhornEndpoint}/submissions.json`, payload);
  return newCommunity.data;
};

const updateCommunity = async (payload) => {
  const revisedCommunity = await axios.patch(`${greenhornEndpoint}/submissions/${payload.id}.json`, payload);
  return revisedCommunity.data;
};

const deleteCommunity = async (id) => {
  const formerCommunity = await axios.delete(`${greenhornEndpoint}/submissions/${id}.json`);
  return formerCommunity;
};

const getFilteredCommunities = async (callback, ...params) => {
  const data = await getAllCommunities();
  const filterData = await callback(data, ...params);
  return filterData;
};

export {
  getAllCommunities,
  getSingleCommunity,
  getMultiCommunities,
  getCommunitySubmissions,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  getFilteredCommunities,
};
