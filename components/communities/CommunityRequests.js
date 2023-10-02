/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunityRequests } from '../../api/communityData';
import Submission from '../submissions/Submission';

export default function CommunityRequests({ communityObj }) {
  const [communityRequests, setCommunityRequests] = useState([]);

  const communityRequestPosts = (id) => {
    getCommunityRequests(id).then(setCommunityRequests);
  };

  const updatePage = () => {
    communityRequestPosts(communityObj.id);
  };

  useEffect(() => {
    communityRequestPosts(communityObj.id);
  }, [communityObj.id]);

  return (
    <section className="submissionSection communityPageSubmissions">
      {communityRequests?.map((communitySubmission) => (
        <Submission key={communitySubmission.id} submissionObj={communitySubmission} afterUpdate={updatePage} />
      ))}
    </section>
  );
}

CommunityRequests.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
