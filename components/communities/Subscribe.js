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

export default function Subscribe({ communityObj }) {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [admin, setAdmin] = useState(false);

  const checkSubscribed = (array) => {
    array.forEach((subscription) => {
      if (subscription.userId === user.uid && subscription.isAdmin === true) {
        setAdmin(true);
      } else if (subscription.userId === user.uid) {
        setAdmin(false);
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
      communityId: communityObj.id,
      userId: user.uid,
      isAdmin: false,
    };
    createUserCommunity(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserCommunity(patchPayload).then(() => {
        communitySubscriptions(communityObj.id);
      });
    });
  };

  const handleSubscription = () => {
    setSubscribed(false);
    if (!subscribed) {
      setSubscribed(true);
      createSubscription();
    } else deleteUserCommunity(subscriptionId).then(() => communitySubscriptions(communityObj.id));
  };

  useEffect(() => {
    communitySubscriptions(communityObj.id);
  }, [communityObj.id]);

  useEffect(() => {
    checkSubscribed(subscriptions);
  }, [subscriptions]);

  return (
    <div className="subscriptionContainer">
      {admin ? <h2>Welcome Home, Boss</h2> : (
        <Checkbox
          label={{ 'aria-label': 'Subscribe Button' }}
          icon={<Button variant="outlined">Subscribe</Button>}
          checkedIcon={<Button variant="contained">Unsubscribe</Button>}
          checked={subscribed}
          onChange={(handleSubscription)}
        />
      )}
    </div>
  );
}

Subscribe.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
  }),
};

Subscribe.defaultProps = {
  communityObj: {},
};
