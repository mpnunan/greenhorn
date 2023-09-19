import {
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { deleteUserComment } from '../../api/userCommentData';

// const initialCommentState = {
//   body: null,
//   userName: null,
// };
export default function Comment({ commentObj, afterUpdate }) {
  const { user } = useAuth();
  const deleteComment = () => {
    if (window.confirm('Delete your comment?')) {
      deleteUserComment(commentObj.id).then(() => afterUpdate());
    }
  };
  return (
    <Card
      sx={{
        backgroundColor: 'antiquewhite',
      }}
    >
      <CardContent>
        <Typography>
          {commentObj.userName}
        </Typography>
        <Typography>
          {commentObj.body}
        </Typography>
        <>
          {user.uid === commentObj.userId ? <Button onClick={deleteComment}>Delete Comment</Button> : null}
        </>
      </CardContent>
    </Card>
  );
}

Comment.propTypes = {
  commentObj: PropTypes.shape({
    body: PropTypes.string,
    userName: PropTypes.string,
    id: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  afterUpdate: PropTypes.func.isRequired,
};

// Comment.defaultProps = {
//   commentObj: initialCommentState,
// };
