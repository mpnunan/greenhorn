import React, { useEffect, useState } from 'react';
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
  const [focus, setFocus] = useState(false);
  const [userInput, setUserInput] = useState(initialCommentState);
  const { user } = useAuth();

  const handleComment = (e) => {
    const { name, value } = e.target;
    setUserInput((defaultState) => ({
      ...defaultState,
      [name]: value,
    }));
  };

  const submitComment = () => {
    const payload = {
      submissionId,
      userId: user.uid,
      body: userInput.body,
      userName: user.displayName,
    };
    createUserComment(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserComment(patchPayload).then(() => {
        afterSubmit();
      });
    });
  };

  const textFocus = (string) => {
    if (string.length) {
      setFocus(true);
    } else setFocus(false);
  };

  useEffect(() => {
    textFocus(userInput.body);
  }, [userInput.body]);

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl
        variant="standard"
        component="form"
        onSubmit={submitComment}
      >
        <InputLabel htmlFor="newComment">
          Add a comment
        </InputLabel>
        <Input
          id="newComment"
          name="body"
          multiline={focus}
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
        {focus
          ? (
            <Button
              type="submit"
              variant="outlined"
            >
              Submit
            </Button>
          )
          : null}
      </FormControl>
    </Box>
  );
}

NewComment.propTypes = {
  submissionId: PropTypes.string.isRequired,
  afterSubmit: PropTypes.func.isRequired,
};
