/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { getUserSaved } from '../../api/userSavedData';
import Submission from '../../components/submissions/Submission';

export default function SavedSubmissions() {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [saveCount, setSaveCount] = useState(0);

  const getSavedSubmissions = () => {
    getUserSaved(user.uid).then(setSaved);
  };

  const checkSaved = (array) => {
    setSaveCount(array.length);
    return saveCount;
  };

  useEffect(() => {
    getSavedSubmissions();
    checkSaved(saved);
  }, [saved]);

  return (
    <Paper
      sx={{
        bgcolor: 'rgba(5, 50, 5, .6)',
        width: '100%',
        height: '100%',
      }}
    >
      <header>
        <h1>
          {`${user.displayName}'s Saved Submissions`}
        </h1>
      </header>
      <section className="submissionSection savedSection">
        {saved.map((save) => (
          <Submission key={save.submissionObj.id} submissionObj={save.submissionObj} afterUpdate={getSavedSubmissions} />
        ))}
      </section>
    </Paper>

  );
}
