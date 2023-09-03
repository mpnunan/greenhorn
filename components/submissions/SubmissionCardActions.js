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
        <Button>{submissionObj.request ? 'Update Request' : 'Update Post'}</Button>
      </Link>
      <Button onClick={cardAction}>{submissionObj.request ? 'Delete Request' : 'Delete Post'}</Button>
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
