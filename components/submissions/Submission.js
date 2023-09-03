import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import SubmissionCardActions from './SubmissionCardActions';

export default function Submission({ submissionObj, afterUpdate }) {
  const { user } = useAuth();
  const [userState, setUserState] = useState(false);

  useEffect(() => {
    if (user.uid === submissionObj.submittedById) setUserState(true);
  }, [user, submissionObj.submittedById]);

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
        {userState ? <SubmissionCardActions submissionObj={submissionObj} updateFunction={afterUpdate} /> : null}
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
  }).isRequired,
  afterUpdate: PropTypes.func.isRequired,
};
