/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import CommunityForm from '../../components/forms/CommunityForm';
import { useAuth } from '../../utils/context/authContext';
import { getUserSubmissions } from '../../api/submissionData';

export default function NewCommunity() {
  const { user } = useAuth();
  const [submisionNumber, setSubmissionNumber] = useState(0);

  const checkActivity = () => {
    getUserSubmissions(user.uid).then((submissions) => {
      setSubmissionNumber(submissions.length);
    });
  };

  useEffect(() => {
    checkActivity();
  }, []);

  return (
    submisionNumber < 5 ? (
      <main>
        <h1>Not quite ready, Champ</h1>
      </main>
    ) : (
      <main>
        <header>
          <h1>Build a Community</h1>
        </header>
        <section id="newSubmissionContainer">
          <CommunityForm />
        </section>
      </main>
    )
  );
}
