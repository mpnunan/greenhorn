import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

export default function Submission({ submissionObj }) {
  return (
    <Card
      className="submissionElement"
      sx={{
        width: 300,

      }}
    >
      <CardContent>
        <Typography variant="h6" component="h2">{submissionObj.title}</Typography>
        <Typography variant="body">{submissionObj.body}</Typography>
      </CardContent>
    </Card>
  );
}

Submission.propTypes = {
  submissionObj: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
