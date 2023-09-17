/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserSaved } from '../../api/userSavedData';
import Submission from '../submissions/Submission';

export default function UserSavedSubmissions() {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);

  const getSavedSubmissions = () => {
    getUserSaved(user.uid).then(setSaved);
  };

  useEffect(() => {
    getSavedSubmissions();
  }, []);

  return (
    <section className="savedSection">
      {saved.map((save) => (
        <Submission key={save.submissionObj.id} submissionObj={save.submissionObj} afterUpdate={getSavedSubmissions} />
      ))}
    </section>

  );
}
