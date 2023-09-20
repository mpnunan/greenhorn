import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FormControl, TextField } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createCommunity, getSingleCommunity, updateCommunity } from '../../api/communityData';
import {
  createUserCommunity,
  getCommunityUserCommunities,
  updateCommunityData,
  updateUserCommunity,
} from '../../api/userCommunityData';

const initialCommunityState = {
  description: '',
  name: '',
};

export default function CommunityForm({ communityObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [userInput, setUserInput] = useState(initialCommunityState);

  useEffect(() => {
    if (communityObj.id) setUserInput(communityObj);
  }, [communityObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((defaultState) => ({
      ...defaultState,
      [name]: value,
    }));
  };

  const updateSubscriptionData = async (payload) => {
    const subscriptionData = await Promise.all([
      getSingleCommunity(payload.id), getCommunityUserCommunities(payload.id),
    ]).then(([community, subscribedCommunities]) => {
      subscribedCommunities.forEach((subscribedCommunity) => {
        updateCommunityData(subscribedCommunity.id, { communityObj: community });
      });
    });
    return subscriptionData;
  };

  const createAdmin = async (payload) => {
    let adminPayload = {};
    const newAdmin = await getSingleCommunity(payload.id).then((community) => {
      adminPayload = {
        userId: user.uid,
        communityObj: community,
        communityId: community.id,
        isAdmin: true,
      };
    })
      .then(() => createUserCommunity(adminPayload))
      .then(({ name }) => {
        const patchPayload = { id: name };
        updateUserCommunity(patchPayload);
      });
    return newAdmin;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (communityObj.id) {
      updateCommunity(userInput)
        .then(() => updateSubscriptionData(communityObj))
        .then(() => router.push(`/communities/${communityObj.id}`));
    } else {
      createCommunity(userInput).then(({ name }) => {
        const patchPayload = { id: name };
        updateCommunity(patchPayload)
          .then(createAdmin)
          .then(() => { router.push(`/communities/${patchPayload.id}`); });
      });
    }
  };

  return (
    <FormControl
      id="communityForm"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: 'antiquewhite',
        border: '2px solid antiquewhite',
        borderRadius: '4px',
        width: '80%',
        padding: '12px',
        marginTop: '24px',
      }}
    >
      <TextField
        id="communityName"
        label="Name"
        name="name"
        value={userInput.name}
        required
        onChange={handleChange}
        multiline
        sx={{
          marginTop: '24px',
        }}
      />
      <TextField
        id="communityDescription"
        label="Description"
        name="description"
        value={userInput.description}
        required
        onChange={handleChange}
        multiline
        minRows={4}
        sx={{
          marginTop: '12px',
          marginBottom: '12px',
        }}
      />
      <Button
        type="submit"
        variant="outlined"
      >
        Submit
      </Button>
    </FormControl>
  );
}

CommunityForm.propTypes = {
  communityObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};

CommunityForm.defaultProps = {
  communityObj: initialCommunityState,
};
