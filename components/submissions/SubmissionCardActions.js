import { Button, CardActions } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteSubmission } from '../../api/submissionData';

export default function SubmissionCardActions({ submissionObj, updateFunction }) {
  const deletePost = () => {
    if (window.confirm(`Delete ${submissionObj.title}?`)) {
      deleteSubmission(submissionObj.id).then(() => updateFunction());
    }
  };

  return (
    <CardActions>
      <Link href={`/submission/edit/${submissionObj.id}`} passHref>
        <Button>Update Post</Button>
      </Link>
      <Button onClick={deletePost}>Delete Post</Button>
    </CardActions>
  );
}

SubmissionCardActions.propTypes = {
  submissionObj: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  updateFunction: PropTypes.func.isRequired,
};
