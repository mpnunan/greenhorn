import { deleteSubmission } from './submissionData';
import { deleteUserComment, getPostComments } from './userCommentData';
import { deleteUserLiked, getPostLiked } from './userLikedData';
import { deleteUserSaved, getPostSaved } from './userSavedData';

const prepareCommentDelete = async (id) => {
  const deletedComments = await getPostComments(id).then((comments) => {
    comments.forEach((comment) => {
      deleteUserComment(comment.id);
    });
  });
  return deletedComments;
};

const prepareLikeDelete = async (id) => {
  const deletedLikes = await getPostLiked(id).then((likes) => {
    likes.forEach((like) => {
      deleteUserLiked(like.id);
    });
  });
  return deletedLikes;
};

const prepareSaveDelete = async (id) => {
  const deletedSaves = await getPostSaved(id).then((saves) => {
    saves.forEach((save) => {
      deleteUserSaved(save.id);
    });
  });
  return deletedSaves;
};

const deleteSubmissionData = async (id) => {
  const deletedSubmissionData = await Promise.all([
    deleteSubmission(id),
    prepareCommentDelete(id),
    prepareLikeDelete(id),
    prepareSaveDelete(id),
  ]);
  return deletedSubmissionData;
};

export default deleteSubmissionData;
