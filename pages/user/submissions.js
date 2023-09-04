/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { getUserSubmissions } from '../../api/submissionData';
import { useAuth } from '../../utils/context/authContext';
import Submission from '../../components/submissions/Submission';

export default function UserSubmissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);

  const getSubmissions = () => {
    getUserSubmissions(user.uid).then(setSubmissions);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <Paper
      sx={{
        bgcolor: 'rgb(5, 50, 5)',
        width: '100%',
        minHeight: 'fit-content',
      }}
    >
      <header>
        <h1>
          {`${user.displayName}'s Submissions`}
        </h1>
      </header>
      <section className="submissionSection">
        {submissions.map((submission) => (
          <Submission key={submission.id} submissionObj={submission} afterUpdate={getSubmissions} />
        ))}
      </section>
    </Paper>

  );
}
