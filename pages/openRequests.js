import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { getAllRequests } from '../api/submissionData';
import Submission from '../components/submissions/Submission';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const getRequests = () => {
    getAllRequests().then(setRequests);
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
