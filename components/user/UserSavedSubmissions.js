/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserSaved } from '../../api/userSavedData';
import { getSingleSubmission } from '../../api/submissionData';
import Submission from '../submissions/Submission';

export default function UserSavedSubmissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [saved, setSaved] = useState([]);

  // The 'findSaveObjects' function pulls userSave objects from a join table
  // and pushes them into an array in state
  //
  // sampleUserSaveObj = {
  //   id: 'firebaseKey',
  //   userId: 'user.uid',
  //   submissionId: 'submissionFirebaseKey',
  // }

  const findSaveObjects = () => {
    getUserSaved(user.uid).then(setSaved);
  };

  // This loops through the userSaveObjects from the above function
  // to get single Submission Objects from firebase
  // and pushes them into an array in state

  const findSavedSubmissions = async (saveObjArray) => {
    const saveArray = [];
    await saveObjArray.forEach((saveObj) => {
      getSingleSubmission(saveObj.submissionId)
        .then((submissionObj) => {
          saveArray.push(submissionObj);
        });
    });
    return saveArray;
  };

  useEffect(() => {
    findSaveObjects();
  }, []);

  useEffect(() => {
    findSavedSubmissions(saved).then(setSubmissions);
  }, [saved]);
  console.warn(submissions);

  return (
    <section className="savedSection">
      {submissions.map((submission) => (
        <Submission key={submission.id} submissionObj={submission} afterUpdate={findSaveObjects} />
      ))}
    </section>

  );
}
