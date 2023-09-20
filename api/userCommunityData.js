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

const getCommunityMembers = async (communityId) => {
  const memberIds = [];
  const members = await getCommunityUserCommunities(communityId);
  members.forEach((member) => {
    memberIds.push(member.userId);
  });
  return memberIds;
};

const getCommunityAdmins = async (communityId) => {
  const communityAdmins = [];
  const allMembers = await getCommunityUserCommunities(communityId);
  allMembers.forEach((member) => {
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

const updateCommunityData = async (id, payload) => {
  const revisedUserCommunity = await axios.patch(`${greenhornEndpoint}/userCommunities/${id}.json`, payload);
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
  getCommunityMembers,
  getCommunityAdmins,
  createUserCommunity,
  updateUserCommunity,
  updateCommunityData,
  deleteUserCommunity,
};
