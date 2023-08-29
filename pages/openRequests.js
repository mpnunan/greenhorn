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
      <section className="submissionSection">
        {requests.map((request) => (
          <Submission key={request.id} submissionObj={request} />
        ))}
      </section>
    </Paper>

  );
}
