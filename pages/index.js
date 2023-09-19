import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Submission from '../components/submissions/Submission';
import { getAllSubmissions } from '../api/submissionData';

function Home() {
  const [submissions, setSubmissions] = useState([]);

  const getSubmissions = () => {
    getAllSubmissions().then(setSubmissions);
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
          greenhorn
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

export default Home;
