import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSubmission } from '../../../../api/submissionData';
import SubmissionForm from '../../../../components/forms/SubmissionForm';

export default function AnswerRequest() {
  const router = useRouter();
  const [requestEdit, setRequestEdit] = useState({});
  const { requestId } = router.query;

  useEffect(() => {
    getSingleSubmission(requestId).then(setRequestEdit);
  }, [requestId]);
  return (
    <main>
      <header>
        <h1>{ `Answer "${requestEdit.title}"` }</h1>
      </header>
      <section
        id="responseSubmissionContainer"
      >
        <SubmissionForm requestObj={requestEdit} />
      </section>
    </main>
  );
}
