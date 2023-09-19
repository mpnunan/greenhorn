import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createUserComment, updateUserComment } from '../../api/userCommentData';

const initialCommentState = {
  submissionId: '',
  userId: '',
  body: '',
  userName: '',
};

export default function NewComment({ submissionId, afterSubmit }) {
  const [userInput, setUserInput] = useState(initialCommentState);
  const { user } = useAuth();

  const handleComment = (e) => {
    const { name, value } = e.target;
    setUserInput((defaultState) => ({
      ...defaultState,
      [name]: value,
    }));
  };

  const submitComment = (e) => {
    e.preventDefault();
    const payload = {
      submissionId,
      userId: user.uid,
      body: userInput.body,
      userName: user.displayName,
    };
    createUserComment(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserComment(patchPayload).then(() => {
        setUserInput(initialCommentState);
        afterSubmit();
      });
    });
  };

  return (
    <Box sx={{ backgroundColor: 'antiquewhite' }}>
      <FormControl
        variant="standard"
        component="form"
        fullWidth
        onSubmit={submitComment}
      >
        <InputLabel htmlFor="newComment">
          Add a comment
        </InputLabel>
        <Input
          id="newComment"
          name="body"
          multiline
          fullWidth
          minRows={4}
          value={userInput.body}
          startAdornment={
            (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }
          onChange={handleComment}
          required
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

NewComment.propTypes = {
  submissionId: PropTypes.string,
  afterSubmit: PropTypes.func.isRequired,
};

NewComment.defaultProps = {
  submissionId: '',
};
