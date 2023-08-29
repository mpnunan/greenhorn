import { Button, Link } from '@mui/material';
import PropTypes from 'prop-types';

export default function CommunityButton({ communityObj, keyNumber }) {
  return (
    <Button
      key={keyNumber}
      component={Link}
      href={`/communities/${communityObj.id}`}
    >
      {communityObj.name}
    </Button>
  );
}

CommunityButton.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  keyNumber: PropTypes.number.isRequired,
};
