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
import { createSubmission, getSingleSubmission, updateSubmission } from '../../api/submissionData';
import { getPostSaved, updateSavedData } from '../../api/userSavedData';

const initialSubmissionState = {
  title: '',
  body: '',
  communityId: '',
  request: false,
};

const initialRequestState = {};

export default function SubmissionForm({ submissionObj, requestObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [userInput, setUserInput] = useState(initialSubmissionState);
  const [requestData, setRequestData] = useState(initialRequestState);

  useEffect(() => {
    if (submissionObj.id) setUserInput(submissionObj);
  }, [submissionObj]);

  useEffect(() => {
    if (requestObj.id) {
      setRequestData({
        communityId: requestObj.communityId,
        title: requestObj.title,
        requestId: requestObj.id,
        requestObj,
      });
    } else setRequestData(null);
  }, [requestObj]);

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

  const updateSubmissionData = async (payload) => {
    const submissionData = await Promise.all([
      getSingleSubmission(payload.id), getPostSaved(payload.id),
    ]).then(([submission, savedSubmissions]) => {
      savedSubmissions.forEach((savedSubmission) => {
        updateSavedData(savedSubmission.id, { submissionObj: submission });
      });
    });
    return submissionData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionObj.id) {
      updateSubmission(userInput)
        .then(updateSubmissionData)
        .then(() => router.push(`/submission/${submissionObj.id}`));
    } else {
      const payload = { ...userInput, ...requestData, submittedById: user.uid };
      createSubmission(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateSubmission(patchPayload)
          .then(() => {
            if (requestObj.id) {
              router.push(`/communities/${requestObj.communityId}`);
            } else router.push(`/communities/${userInput.communityId}`);
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
        width: '80vw',
        padding: '12px',
        marginTop: '24px',
      }}
    >
      <FormControlLabel
        control={<Switch color="success" />}
        label="Request"
        name="request"
        role="checkbox"
        checked={userInput.request}
        onChange={handleToggle}
        disabled={Boolean(requestData)}
        aria-label="Toggle Submission or Request Toggle"
        sx={{
          alignSelf: 'flex-end',
          marginTop: '8px',
          marginRight: '16px',
        }}
      />
      <ToggleButtonGroup
        name="communityName"
        value={{ ...userInput, ...requestObj }.communityId}
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
          disabled={Boolean(requestData)}
        >
          Woodworking
        </ToggleButton>
        <ToggleButton
          name="-Ncn3FuIbACyhYyleOHK"
          value="-Ncn3FuIbACyhYyleOHK"
          disabled={Boolean(requestData)}
        >
          Metalworking
        </ToggleButton>
        <ToggleButton
          name="-Ncn2W_RM7TXaYiB6LES"
          value="-Ncn2W_RM7TXaYiB6LES"
          disabled={Boolean(requestData)}
        >
          Coatings
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        id="submissionTitle"
        label="Title"
        name="title"
        value={{ ...userInput, ...requestObj }.title}
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
        color="success"
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
    requestId: PropTypes.string,
    requestObj: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      communityId: PropTypes.string,
      request: PropTypes.bool,
      id: PropTypes.string,
    }),
  }),
  requestObj: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    communityId: PropTypes.string,
    request: PropTypes.bool,
    id: PropTypes.string,
  }),
};

SubmissionForm.defaultProps = {
  submissionObj: initialSubmissionState,
  requestObj: initialRequestState,
};
