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
import { ChatBubbleOutline } from '@mui/icons-material';
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
        width: '100%',
        height: 'fit-content',
        bgcolor: 'antiquewhite',
        border: '4px solid rgb(5, 50, 5)',
        borderRadius: '8px',
        boxShadow: '-5px 5px 5px rgba(5, 50, 5)',
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
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link passHref href={`/submission/${submissionObj.id}`}>
          <IconButton
            sx={{
              ':hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            <ChatBubbleOutline
              sx={{
                ':hover': {
                  color: 'rgba(5, 10, 5, 1)',
                },
              }}
            />
          </IconButton>
        </Link>
        <>
          {answer
            ? (
              <Link passHref href={`/requests/${submissionObj.requestId}`}>
                <Button
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    ':hover': {
                      color: 'rgba(5,60,5,.8)',
                      border: '1px solid rgba(5, 60, 5, .8)',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  See Question
                </Button>
              </Link>
            )
            : null}
        </>
      </CardContent>
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
