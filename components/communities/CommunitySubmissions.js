import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunitySubmissions } from '../../api/communityData';
import Submission from '../submissions/Submission';

export default function CommunitySubmissions({ communityObj }) {
  const [communitySubmissions, setCommunitySubmissions] = useState([]);

  const communitySpecificSubmissions = (id) => {
    getCommunitySubmissions(id).then(setCommunitySubmissions);
  };

  useEffect(() => {
    communitySpecificSubmissions(communityObj.id);
  }, [communityObj.id]);

  return (
    <section className="communityPageSubmissions">
      {communitySubmissions.map((communitySubmission) => (
        <Submission key={communitySubmission.id} submissionObj={communitySubmission} />
      ))}
    </section>
  );
}

CommunitySubmissions.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
