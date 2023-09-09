import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getSingleCommunity } from './communityData';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserCommunities = async (userId) => {
  const userCommunityArray = [];
  const userCommunities = await axios.get(`${greenhornEndpoint}/userCommunities.json?orderBy="userId"&equalTo="${userId}"`);
  const userCommunityIdArray = Object.values(userCommunities.data);
  userCommunityIdArray.forEach((userCommunity) => {
    getSingleCommunity(userCommunity.communityId)
      .then((community) => {
        userCommunityArray.push(community);
      });
  });
  return userCommunityArray;
};

const getSingleUserCommunity = async (id) => {
  const userCommunity = await axios.get(`${greenhornEndpoint}/userCommunities/${id}.json`);
  return userCommunity.data;
};

const getCommunityUserCommunities = async (communityId) => {
  const communityUserCommunities = await axios.get(`${greenhornEndpoint}/userCommunities.json?orderBy="communityId"&equalTo="${communityId}"`);
  return Object.values(communityUserCommunities.data);
};

const getCommunityMembers = async (communityId) => {
  const communityMembers = [];
  const userCommunityArray = await getCommunityUserCommunities(communityId);
  userCommunityArray.forEach((userCommunity) => {
    communityMembers.push(userCommunity.userId);
  });
  return communityMembers;
};

const getCommunityAdmins = async (communityId) => {
  const communityAdmins = [];
  const communityMembers = await getCommunityMembers(communityId);
  communityMembers.forEach((member) => {
    if (member.isAdmin === true) {
      communityAdmins.push(member);
    }
  });
  return communityAdmins;
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
  getCommunityMembers,
  getCommunityAdmins,
  createUserCommunity,
  updateUserCommunity,
  deleteUserCommunity,
};
