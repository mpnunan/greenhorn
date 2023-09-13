/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Submission from '../../components/submissions/Submission';
import { getSingleSubmission } from '../../api/submissionData';
import NewComment from '../../components/submissions/NewComment';

export default function SubmissionDetails() {
  const router = useRouter();
  const [singleSubmission, setSingleSubmission] = useState({});
  const { submissionId } = router.query;

  const submissionDetails = () => {
    getSingleSubmission(submissionId).then(setSingleSubmission);
  };

  const detailsPageUpdate = () => {
    if (submissionId === singleSubmission.id) {
      submissionDetails();
    } else router.push('/');
  };

  useEffect(() => {
    submissionDetails();
  }, []);

  return (
    <section id="submissionPage">
      <Submission key={singleSubmission.id} submissionObj={singleSubmission} afterUpdate={detailsPageUpdate} />
      <NewComment submissionId={singleSubmission.id} afterSubmit={detailsPageUpdate} />
    </section>
  );
}
