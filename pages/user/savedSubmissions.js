/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
// import Submission from '../../components/submissions/Submission';
import UserSavedSubmissions from '../../components/user/UserSavedSubmissions';
// import { getUserSaved } from '../../api/userSavedData';
// import { getSingleSubmission } from '../../api/submissionData';

export default function SavedSubmissions() {
  const { user } = useAuth();
  // const [submissions, setSubmissions] = useState([]);
  // const [saved, setSaved] = useState([]);

  // const findSaveObjects = async () => {
  //   getUserSaved(user.uid).then(setSaved);
  // };

  // const findSavedSubmissions = async (saveObjArray) => {
  //   const saveArray = [];
  //   await saveObjArray.forEach((saveObj) => {
  //     getSingleSubmission(saveObj.submissionId)
  //       .then((submissionObj) => {
  //         saveArray.push(submissionObj);
  //       });
  //   });
  //   return saveArray;
  // };

  // useEffect(() => {
  //   findSaveObjects();
  // }, []);

  // useEffect(() => {
  //   findSavedSubmissions(saved).then(setSubmissions);
  // }, [saved]);
  // console.warn(submissions);

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
      {/* <section className="savedSection">
        {submissions.map((submission) => (
          <Submission key={submission.id} submissionObj={submission} afterUpdate={findSaveObjects} />
        ))}
      </section> */}
      <UserSavedSubmissions />
    </Paper>

  );
}
