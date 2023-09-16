/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import Submission from '../../components/submissions/Submission';
import { getUserSaved } from '../../api/userSavedData';
import { getSingleSubmission } from '../../api/submissionData';

export default function SavedSubmissions() {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [savedSubmissions, setSavedSubmissions] = useState([]);

  const findSaveObjects = async (uid) => {
    getUserSaved(uid).then(setSaved);
  };

  const findSavedSubmissions = (saveObjArray) => {
    const saveArray = [];
    saveObjArray.forEach((saveObj) => {
      getSingleSubmission(saveObj.submissionId)
        .then((submissionObj) => {
          console.warn(submissionObj);
          saveArray.push(submissionObj);
        });
    });
    setSavedSubmissions(saveArray);
    console.warn(savedSubmissions);
  };

  useEffect(() => {
    findSaveObjects(user.uid);
  }, [user.uid]);

  useEffect(() => {
    findSavedSubmissions(saved);
  }, [saved]);

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
          {`${user.displayName}'s Saved Submissions`}
        </h1>
      </header>
      <section className="savedSection">
        {savedSubmissions.map((savedSubmission) => (
          <Submission key={savedSubmission.id} submissionObj={savedSubmission} afterUpdate={findSavedSubmissions(saved)} />
        ))}
      </section>
    </Paper>

  );
}
