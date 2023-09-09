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

const getUserSubmissions = async (userId) => {
  const userSubmissions = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="submittedById"&equalTo="${userId}"`);
  return Object.values(userSubmissions.data);
};

const getSingleSubmission = async (id) => {
  const submission = await axios.get(`${greenhornEndpoint}/submissions/${id}.json`);
  return submission.data;
};

const createSubmission = async (payload) => {
  const newSubmission = await axios.post(`${greenhornEndpoint}/submissions.json`, payload);
  return newSubmission.data;
};

const updateSubmission = async (payload) => {
  const revisedSubmission = await axios.patch(`${greenhornEndpoint}/submissions/${payload.id}.json`, payload);
  return revisedSubmission.data;
};

const deleteSubmission = async (id) => {
  const formerSubmission = await axios.delete(`${greenhornEndpoint}/submissions/${id}.json`);
  return formerSubmission.data;
};

export {
  getAllSubmissions,
  getAllRequests,
  getUserSubmissions,
  getSingleSubmission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
};
