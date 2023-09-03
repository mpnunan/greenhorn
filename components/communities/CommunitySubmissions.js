import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunitySubmissions } from '../../api/communityData';
import Submission from '../submissions/Submission';

export default function CommunitySubmissions({ communityObj }) {
  const [communitySubmissions, setCommunitySubmissions] = useState([]);

  const communitySpecificSubmissions = (communityId) => {
    getCommunitySubmissions(communityId).then(setCommunitySubmissions);
  };

  useEffect(() => {
    communitySpecificSubmissions(communityObj.id);
  }, [communityObj]);

  return (
    <section className="communityPageSubmissions">
      {communitySubmissions.map((communitySubmission) => (
        <Submission key={communitySubmission.id} submissionObj={communitySubmission} afterUpdate={communitySpecificSubmissions} />
      ))}
    </section>
  );
}

CommunitySubmissions.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
