/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '@mui/material';
import {
  createUserCommunity,
  deleteUserCommunity,
  getCommunityUserCommunities,
  updateUserCommunity,
} from '../../api/userCommunityData';
import { useAuth } from '../../utils/context/authContext';

export default function Subscribe({ communityObj, communityId }) {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [admin, setAdmin] = useState(false);

  const checkSubscribed = async (array) => {
    setAdmin(false);
    setSubscribed(false);
    await array.forEach((subscription) => {
      if (subscription.userId === user.uid && subscription.isAdmin === true) {
        setAdmin(true);
      } else if (subscription.userId === user.uid) {
        setSubscribed(true);
        setSubscriptionId(subscription.id);
      }
    });
  };

  const communitySubscriptions = (id) => {
    getCommunityUserCommunities(id).then(setSubscriptions);
  };

  const createSubscription = () => {
    const payload = {
      communityObj,
      communityId: communityId.toString(),
      userId: user.uid,
      isAdmin: false,
    };
    createUserCommunity(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserCommunity(patchPayload).then(() => {
        communitySubscriptions(communityId);
      });
    });
  };

  const handleSubscription = () => {
    if (!subscribed) {
      setSubscribed(true);
      createSubscription();
    } else {
      setSubscribed(false);
      deleteUserCommunity(subscriptionId).then(() => communitySubscriptions(communityId));
    }
  };

  useEffect(() => {
    communitySubscriptions(communityId);
  }, [communityId]);

  useEffect(() => {
    checkSubscribed(subscriptions);
  }, [subscriptions]);

  return (
    <div className="subscriptionContainer">
      {admin === true ? <h2>Welcome Home, Boss</h2> : (
        <Checkbox
          label={{ 'aria-label': 'Subscribe Button' }}
          icon={<Button variant="outlined" color="success" sx={{ color: 'antiquewhite', width: '160px' }}>Subscribe</Button>}
          checkedIcon={<Button variant="contained" color="success" sx={{ color: 'antiquewhite', width: '160px' }}>Unsubscribe</Button>}
          checked={subscribed}
          onChange={(handleSubscription)}
          sx={{
            ':hover': { opacity: '.8' },
          }}
        />
      )}
    </div>
  );
}

Subscribe.propTypes = {
  communityId: PropTypes.string.isRequired,
  communityObj: PropTypes.shape({}).isRequired,
};
