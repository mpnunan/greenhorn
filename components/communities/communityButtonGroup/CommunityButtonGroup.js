import { useEffect, useState } from 'react';
import { ButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';
import { getAllCommunities } from '../../../api/communityData';
import CommunityButton from './CommunityButton';

export default function CommunityButtonGroup({ clickAction }) {
  const [communities, setCommunities] = useState([]);

  const getCommunities = () => {
    getAllCommunities().then(setCommunities);
  };

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <ButtonGroup>
      {communities.map((community) => (
        <CommunityButton key={community.id} keyNumber={communities.indexOf(community) + 1} communityObj={community} clickAction={clickAction} />
      ))}
    </ButtonGroup>
  );
}

CommunityButtonGroup.propTypes = ({
  clickAction: PropTypes.func.isRequired,
});
