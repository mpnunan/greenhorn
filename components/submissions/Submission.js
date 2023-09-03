import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import SubmissionCardActions from './SubmissionCardActions';
import { deleteSubmission } from '../../api/submissionData';
import RequestActions from './RequestActions';

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
      className="submissionElement"
      sx={{
        width: 300,
        height: 'fit-content',

      }}
    >
      <CardContent>
        <Typography variant="h6" component="h2">{submissionObj.title}</Typography>
        <Typography variant="body">{submissionObj.body}</Typography>
      </CardContent>
      <>
        {userState ? <SubmissionCardActions submissionObj={submissionObj} cardAction={deletePost} /> : null}
      </>
      <>
        {userRequestState ? <RequestActions /> : null}
      </>
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
