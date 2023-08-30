import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { getAllRequests } from '../api/submissionData';
import Submission from '../components/submissions/Submission';
import CommunityButtonGroup from '../components/communities/communityButtonGroup/CommunityButtonGroup';

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
        <CommunityButtonGroup />
      </header>
      <section className="submissionSection">
        {requests.map((request) => (
          <Submission key={request.id} submissionObj={request} />
        ))}
      </section>
    </Paper>

  );
}
