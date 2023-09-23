import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { getSingleSubmission } from '../../api/submissionData';

export default function AnsweredRequest() {
  const router = useRouter();
  const [request, setRequest] = useState({});

  const { requestId } = router.query;

  useEffect(() => {
    getSingleSubmission(requestId).then(setRequest);
  }, [requestId]);

  return (
    <Paper
      sx={{
        bgcolor: 'rgba(5, 50, 5, .6)',
        width: '100%',
        height: '100%',
        minHeight: '40vh',
      }}
    >
      <h1>{request.title}</h1>
      <section
        className="closedRequestPage"
      >
        <Typography
          variant="body"
          sx={{
            color: 'antiquewhite',
          }}
        >
          {request.body}
        </Typography>
      </section>
    </Paper>
  );
}
