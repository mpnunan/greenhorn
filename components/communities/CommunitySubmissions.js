/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCommunitySubmissions } from '../../api/communityData';
import Submission from '../submissions/Submission';

export default function CommunitySubmissions({ communityObj }) {
  const [communitySubmissions, setCommunitySubmissions] = useState([]);

  const communityPosts = (id) => {
    getCommunitySubmissions(id).then(setCommunitySubmissions);
  };

  const updatePage = () => {
    communityPosts(communityObj.id);
  };

  useEffect(() => {
    communityPosts(communityObj.id);
  }, [communityObj.id]);

  return (
    <section className="submissionSection communityPageSubmissions">
      {communitySubmissions.map((communitySubmission) => (
        <Submission key={communitySubmission.id} submissionObj={communitySubmission} afterUpdate={updatePage} />
      ))}
    </section>
  );
}

CommunitySubmissions.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
