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
        <Button
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
            margin: '4px 4px',
            ':hover': {
              color: 'rgba(5,60,5,.8)',
              border: '1px solid rgba(5, 60, 5, .8)',
              bgcolor: 'transparent',
            },
          }}
        >
          Provide an Answer
        </Button>
      </Link>
    </CardActions>
  );
}

RequestActions.propTypes = {
  requestId: PropTypes.string.isRequired,
};
