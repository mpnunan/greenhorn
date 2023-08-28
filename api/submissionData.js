import axios from 'axios';
import { clientCredentials } from '../utils/client';

const greenhornEndpoint = clientCredentials.databaseURL;

const getAllSubmissions = async () => {
  const submissions = await axios.get(`${greenhornEndpoint}/submissions/.json`);
  return submissions;
};

const getUserSubmissions = async (id) => {
  const userSubmissions = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="submittedById"&equalTo="${id}"`);
  return userSubmissions;
};

const getSingleSubmission = async (id) => {
  const submission = await axios.get(`${greenhornEndpoint}/submissions/${id}.json`);
  return submission;
};

export {
  getAllSubmissions,
  getUserSubmissions,
  getSingleSubmission,
};
