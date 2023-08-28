import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getMultiCommunities, getSingleCommunity } from './communityData';

const greenhornEndpoint = clientCredentials.databaseURL;

const getUserCommunities = async (id) => {
  const userCommunityArray = [];
  const userCommunities = await axios.get(`${greenhornEndpoint}/userCommunities.json?orderBy="userId"&equalTo="${id}"`);
  userCommunities.forEach((userCommunity) => {
    getSingleCommunity(userCommunity.communityId)
      .then((community) => {
        userCommunityArray.push(community);
      });
  });
  return userCommunityArray;
};

const getUserMultiCommunities = async (id) => {
  const userCommunities = await getUserCommunities(id);
  const userMultiCommunities = await getMultiCommunities(userCommunities);
  return userMultiCommunities;
};

export {
  getUserCommunities,
  getUserMultiCommunities,
};
