import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Submission from '../../components/submissions/Submission';
import { getOpenRequests } from '../../api/joinedRequestData';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const getRequests = () => {
    getOpenRequests().then(setRequests);
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Paper
      sx={{
        bgcolor: 'rgb(5, 50, 5)',
        width: '80vw',
        height: '80vh',
      }}
    >
      <header>
        <h1>
          Open Requests
        </h1>
      </header>
      <section className="openRequests">
        {requests.map((request) => (
          <Submission key={request.id} submissionObj={request} afterUpdate={getRequests} />
        ))}
      </section>
    </Paper>

  );
}
