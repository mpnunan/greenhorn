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

const getCommunityMembers = async (communityId) => {
  const communityMembers = [];
  const userCommunityArray = await getCommunityUserCommunities(communityId);
  userCommunityArray.forEach((userCommunity) => {
    communityMembers.push(userCommunity.userId);
  });
  return communityMembers;
};

const getUserUserCommunities = async (userId) => {
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
