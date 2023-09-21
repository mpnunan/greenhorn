import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleSubmission } from '../../../api/submissionData';
import SubmissionForm from '../../../components/forms/SubmissionForm';

export default function UpdateSubmission() {
  const router = useRouter();
  const [submissionEdit, setSubmissionEdit] = useState({});
  const { submissionId } = router.query;

  useEffect(() => {
    getSingleSubmission(submissionId).then(setSubmissionEdit);
  }, [submissionId]);

  return (
    <main>
      <header>
        <h1>Update</h1>
      </header>
      <section id="editSubmissionContainer">
        <SubmissionForm submissionObj={submissionEdit} />
      </section>
    </main>
  );
}
