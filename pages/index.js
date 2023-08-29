import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Submission from '../components/submissions/Submission';
import { getAllSubmissions } from '../api/submissionData';
import CommunityButtonGroup from '../components/communities/communityButtonGroup/CommunityButtonGroup';

function Home() {
  // const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
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
        width: '80vw',
        height: '80vh',
      }}
    >
      <header>
        <CommunityButtonGroup />
      </header>
      <section className="submissionSection">
        {submissions.map((submission) => (
          <Submission key={submission.id} submissionObj={submission} />
        ))}
      </section>
    </Paper>

  );
}

export default Home;
