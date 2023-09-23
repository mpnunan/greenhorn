import { Button, CardActions } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function SubmissionCardActions({ submissionObj, cardAction }) {
  return (
    <CardActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <Link href={`/submission/edit/${submissionObj.id}`} passHref>
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
          {submissionObj.request ? 'Update Request' : 'Update Post'}
        </Button>
      </Link>
      <Button
        onClick={cardAction}
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
        {submissionObj.request ? 'Delete Request' : 'Delete Post'}
      </Button>
    </CardActions>
  );
}

SubmissionCardActions.propTypes = {
  submissionObj: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    request: PropTypes.bool,
  }).isRequired,
  cardAction: PropTypes.func.isRequired,
};
