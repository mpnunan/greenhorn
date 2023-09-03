import {
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createSubmission, updateSubmission } from '../../api/submissionData';

const initialSubmissionState = {
  title: '',
  body: '',
  communityId: '',
  request: false,
};

export default function SubmissionForm({ submissionObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [userInput, setUserInput] = useState(initialSubmissionState);

  useEffect(() => {
    if (submissionObj.id) setUserInput(submissionObj);
  }, [submissionObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((defaultState) => ({
      ...defaultState,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      communityId: e.target.value,
    }));
  };

  const handleToggle = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      request: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionObj.id) {
      updateSubmission(userInput).then(() => router.push(`/submission/${submissionObj.id}`));
    } else {
      const payload = { ...userInput, submittedById: user.uid };
      createSubmission(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateSubmission(patchPayload).then(() => {
          router.push(`/communities/${userInput.communityId}`);
        });
      });
    }
  };

  return (
    <FormControl
      id="submissionForm"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: 'antiquewhite',
        border: '2px solid antiquewhite',
        borderRadius: '4px',
        width: '80%',
        padding: '12px',
        marginTop: '24px',
      }}
    >
      <FormControlLabel
        control={<Switch />}
        label="Request"
        name="request"
        role="checkbox"
        checked={userInput.request}
        onChange={handleToggle}
        aria-label="Toggle Submission or Request Toggle"
        sx={{
          alignSelf: 'flex-end',
          marginTop: '8px',
          marginRight: '16px',
        }}
      />
      <ToggleButtonGroup
        name="communityName"
        value={userInput.communityId}
        exclusive
        required
        onChange={handleSelect}
        aria-label="Community Selection"
        sx={{
          color: 'antiquewhite',
          width: 'fit-content',
          alignSelf: 'center',
          marginTop: '12px',
        }}
      >
        <ToggleButton
          name="-Ncn2prJ6SJ1GmWyG9TC"
          value="-Ncn2prJ6SJ1GmWyG9TC"
        >
          Woodworking
        </ToggleButton>
        <ToggleButton
          name="-Ncn3FuIbACyhYyleOHK"
          value="-Ncn3FuIbACyhYyleOHK"
        >
          Metalworking
        </ToggleButton>
        <ToggleButton
          name="-Ncn2W_RM7TXaYiB6LES"
          value="-Ncn2W_RM7TXaYiB6LES"
        >
          Coatings
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        id="submissionTitle"
        label="Title"
        name="title"
        value={userInput.title}
        required
        onChange={handleChange}
        multiline
        sx={{
          marginTop: '24px',
        }}
      />
      <TextField
        id="submissionBody"
        label="Body"
        name="body"
        value={userInput.body}
        required
        onChange={handleChange}
        multiline
        minRows={10}
        sx={{
          marginTop: '12px',
          marginBottom: '12px',
        }}
      />
      <Button
        type="submit"
        variant="outlined"
      >
        Submit
      </Button>
    </FormControl>
  );
}

SubmissionForm.propTypes = {
  submissionObj: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    communityId: PropTypes.string,
    request: PropTypes.bool,
    id: PropTypes.string,
  }),
};

SubmissionForm.defaultProps = {
  submissionObj: initialSubmissionState,
};
