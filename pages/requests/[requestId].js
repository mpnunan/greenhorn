import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSubmission } from '../../api/submissionData';

export default function AnsweredRequest() {
  const router = useRouter();
  const [request, setRequest] = useState({});

  const { requestId } = router.query;

  useEffect(() => {
    getSingleSubmission(requestId).then(setRequest);
  }, [requestId]);

  return (
    <main>
      <h1>{request.title}</h1>
      <section>
        {request.body}
      </section>
    </main>
  );
}
