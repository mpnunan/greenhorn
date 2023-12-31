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

const getCommunitySubmissions = async (id) => {
  const communitySubmissions = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="communityId"&equalTo="${id}"`);
  return Object.values(communitySubmissions.data);
};

const getCommunityOnlySubmissions = async (id) => {
  const communitySubmissions = await getCommunitySubmissions(id);
  const communityOnlySubmissions = communitySubmissions.filter((submission) => (submission.request === false));
  return communityOnlySubmissions;
};

const getCommunityRequests = async (id) => {
  const communitySubmissions = await getCommunitySubmissions(id);
  const communityRequests = communitySubmissions.filter((submission) => (submission.request === true));
  return communityRequests;
};

const createCommunity = async (payload) => {
  const newCommunity = await axios.post(`${greenhornEndpoint}/communities.json`, payload);
  return newCommunity.data;
};

const updateCommunity = async (payload) => {
  const revisedCommunity = await axios.patch(`${greenhornEndpoint}/communities/${payload.id}.json`, payload);
  return revisedCommunity.data;
};

const deleteCommunity = async (id) => {
  const formerCommunity = await axios.delete(`${greenhornEndpoint}/communities/${id}.json`);
  return formerCommunity.data;
};

export {
  getAllCommunities,
  getSingleCommunity,
  getCommunitySubmissions,
  getCommunityOnlySubmissions,
  getCommunityRequests,
  createCommunity,
  updateCommunity,
  deleteCommunity,
};
