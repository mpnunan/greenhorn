import { Button, CardActions } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function RequestActions({ requestId }) {
  return (
    <CardActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <Link href={`/submission/edit/request/${requestId}`} passHref>
        <Button>Provide an Answer</Button>
      </Link>
    </CardActions>
  );
}

RequestActions.propTypes = {
  requestId: PropTypes.string.isRequired,
};
