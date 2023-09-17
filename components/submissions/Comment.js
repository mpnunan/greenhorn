import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const initialCommentState = {
  body: null,
};
export default function Comment({ commentObj }) {
  return (
    <Card
      sx={{
        backgroundColor: 'antiquewhite',
      }}
    >
      <CardContent>
        <Typography>
          {commentObj.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

Comment.propTypes = {
  commentObj: PropTypes.shape({
    body: PropTypes.string,
  }),
};

Comment.defaultProps = {
  commentObj: initialCommentState,
};
