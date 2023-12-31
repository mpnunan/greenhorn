import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Forum } from '@mui/icons-material';
import { useAuth } from '../../utils/context/authContext';
import SubmissionCardActions from './SubmissionCardActions';
import { deleteSubmission } from '../../api/submissionData';
import RequestActions from './RequestActions';
import LikeSave from './LikeSave';

export default function Submission({ submissionObj, afterUpdate }) {
  const { user } = useAuth();
  const [userState, setUserState] = useState(false);
  const [userRequestState, setUserRequestState] = useState(false);

  const deletePost = () => {
    if (window.confirm(`Delete ${submissionObj.title}?`)) {
      deleteSubmission(submissionObj.id).then(() => afterUpdate());
    }
  };

  useEffect(() => {
    if (user.uid === submissionObj.submittedById) setUserState(true);
  }, [user, submissionObj.submittedById]);

  useEffect(() => {
    if (submissionObj.request && user.uid !== submissionObj.submittedById) setUserRequestState(true);
  }, [user, submissionObj.submittedById, submissionObj.request]);

  return (
    <Card
      className="singleSubmission"
      sx={{
        width: '60vw',
        height: 'fit-content',

      }}
    >
      <CardContent>
        <LikeSave submissionObj={submissionObj} />
        <Typography
          variant="h6"
          component="h2"
        >
          {submissionObj.title}
        </Typography>
        <Typography
          variant="body"
        >
          {submissionObj.body}
        </Typography>
      </CardContent>
      <>
        {userState ? <SubmissionCardActions submissionObj={submissionObj} cardAction={deletePost} /> : null}
      </>
      <>
        {userRequestState ? <RequestActions /> : null}
      </>
      <Link passHref href={`/submission/${submissionObj.id}`}>
        <IconButton>
          <Forum />
        </IconButton>
      </Link>
    </Card>
  );
}

Submission.propTypes = {
  submissionObj: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    submittedById: PropTypes.string,
    request: PropTypes.bool,
  }).isRequired,
  afterUpdate: PropTypes.func.isRequired,
};
