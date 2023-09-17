/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostComments } from '../../api/userCommentData';
import Comment from './Comment';

export default function CommentSection({ submissionId }) {
  const [comments, setComments] = useState([]);

  const submissionComments = () => {
    getPostComments(submissionId).then(setComments);
  };

  useEffect(() => {
    submissionComments();
  }, []);

  return (
    <section className="commentSection">
      {comments.map((comment) => (
        <Comment key={comment.id} commentObj={comment} />
      ))}
    </section>
  );
}

CommentSection.propTypes = {
  submissionId: PropTypes.string.isRequired,
};
