/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunitySubmissions } from '../../api/communityData';
import Submission from '../submissions/Submission';

export default function CommunitySubmissions({ communityObj }) {
  const [communitySubmissions, setCommunitySubmissions] = useState([communityObj]);

  const communityPosts = () => {
    getCommunitySubmissions(communityObj.id).then(setCommunitySubmissions);
  };

  useEffect(() => {
    communityPosts();
  }, []);

  return (
    <section className="communityPageSubmissions">
      {communitySubmissions.map((communitySubmission) => (
        <Submission key={communitySubmission.id} submissionObj={communitySubmission} afterUpdate={communityPosts} />
      ))}
    </section>
  );
}

CommunitySubmissions.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
