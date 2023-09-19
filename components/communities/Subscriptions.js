/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ButtonGroup } from '@mui/material';
import CommunityButton from './communityButtonGroup/CommunityButton';
import { getUserCommunities } from '../../api/userCommunityData';
import { useAuth } from '../../utils/context/authContext';

export default function Subscriptions() {
  const { user } = useAuth();
  const [communities, setCommunities] = useState();

  const getSubscriptions = (id) => {
    getUserCommunities(id).then(setCommunities);
  };

  useEffect(() => {
    getSubscriptions(user.uid);
  }, [user.uid]);

  return (
    <ButtonGroup>
      {communities?.map((community) => (
        <CommunityButton key={community.communityObj.id} keyNumber={communities.indexOf(community) + 1} communityObj={community.communityObj} />
      ))}
    </ButtonGroup>
  );
}
