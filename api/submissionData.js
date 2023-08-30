import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getAllSubmissions = async () => {
  const submissions = await axios.get(`${greenhornEndpoint}/submissions.json`);
  return Object.values(submissions.data);
};

const getAllRequests = async () => {
  const requests = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="request"&equalTo=true`);
  return Object.values(requests.data);
};

const getUserSubmissions = async (id) => {
  const userSubmissions = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="submittedById"&equalTo="${id}"`);
  return Object.values(userSubmissions.data);
};

const getSingleSubmission = async (id) => {
  const submission = await axios.get(`${greenhornEndpoint}/submissions/${id}.json`);
  return submission.data;
};

export {
  getAllSubmissions,
  getAllRequests,
  getUserSubmissions,
  getSingleSubmission,
};
