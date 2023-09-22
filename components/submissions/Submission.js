import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Forum } from '@mui/icons-material';
import { useAuth } from '../../utils/context/authContext';
import SubmissionCardActions from './SubmissionCardActions';
import RequestActions from './RequestActions';
import LikeSave from './LikeSave';
import deleteSubmissionData from '../../api/joinedSubmissionData';

export default function Submission({ submissionObj, afterUpdate }) {
  const { user } = useAuth();
  const [userState, setUserState] = useState(false);
  const [userRequestState, setUserRequestState] = useState(false);
  const [answer, setAnswer] = useState(false);

  const deletePost = () => {
    if (window.confirm(`Delete ${submissionObj.title}?`)) {
      deleteSubmissionData(submissionObj.id).then(() => afterUpdate());
    }
  };

  useEffect(() => {
    if (user.uid === submissionObj.submittedById) setUserState(true);
  }, [user, submissionObj.submittedById]);

  useEffect(() => {
    if (submissionObj.request && user.uid !== submissionObj.submittedById) setUserRequestState(true);
  }, [user, submissionObj.submittedById, submissionObj.request]);

  useEffect(() => {
    if (submissionObj.requestId) setAnswer(true);
  }, [submissionObj]);

  return (
    <Card
      className="submissionElement"
      raised
      sx={{
        width: 300,
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
        {userRequestState ? <RequestActions requestId={submissionObj.id} /> : null}
      </>
      <>
        {answer ? <Link passHref href={`/requests/${submissionObj.requestId}`}><Button>See Question</Button></Link> : null}
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
    requestId: PropTypes.string,
  }).isRequired,
  afterUpdate: PropTypes.func.isRequired,
};
