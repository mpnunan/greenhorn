/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SingleSubmission from '../../components/submissions/Submission';
import { getSingleSubmission } from '../../api/submissionData';
import CommentSection from '../../components/submissions/CommentSection';

export default function SubmissionDetails() {
  const router = useRouter();
  const [singleSubmission, setSingleSubmission] = useState({});
  const { submissionId } = router.query;

  const submissionDetails = () => {
    getSingleSubmission(submissionId).then(setSingleSubmission);
  };

  const deleteSinglePost = () => {
    router.push('/');
  };

  useEffect(() => {
    submissionDetails();
  }, []);

  return (
    <main>
      <section id="submissionPage">
        <SingleSubmission key={submissionId} submissionObj={singleSubmission} afterUpdate={deleteSinglePost} />
      </section>
      <CommentSection key={`${submissionId}comments`} submissionId={submissionId} />
    </main>
  );
}
