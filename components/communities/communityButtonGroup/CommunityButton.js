import { Button } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function CommunityButton({ communityObj, keyNumber }) {
  return (
    <Link href={`/communities/${communityObj.id}`} passHref>
      <Button
        key={keyNumber}
      >
        {communityObj.name}
      </Button>
    </Link>
  );
}

CommunityButton.propTypes = {
  communityObj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  keyNumber: PropTypes.number.isRequired,
};
