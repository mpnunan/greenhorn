import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getAllRequests } from './submissionData';

const greenhornEndpoint = clientCredentials.databaseURL;

const getAllAnswers = async () => {
  const answers = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="requestId"&startAt=1`);
  return Object.values(answers.data);
};

const getOpenRequests = async () => {
  const openRequests = [];
  await Promise.all([
    getAllAnswers(), getAllRequests(),
  ]).then(([answers, requests]) => {
    const answeredIds = answers.map((answer) => (answer.requestId));
    requests.forEach((request) => {
      if (answeredIds.indexOf(request.id) === -1) {
        openRequests.push(request);
      }
    });
  });
  return openRequests;
};

const getNoAnswers = async () => {
  const onlySubmissions = await axios.get(`${greenhornEndpoint}/submissions.json?orderBy="requestId"&endAt=false`);
  return Object.values(onlySubmissions.data);
};

const getOpenSubmissions = async () => {
  const openSubmissions = [];
  await Promise.all([
    getAllRequests(), getNoAnswers(),
  ]).then(([requests, nonAnswers]) => {
    const requestIds = requests.map((request) => (request.id));
    nonAnswers.forEach((nonAnswer) => {
      if (requestIds.indexOf(nonAnswer.id) === -1) {
        openSubmissions.push(nonAnswer);
      }
    });
  });
  return openSubmissions;
};

export { getOpenRequests, getOpenSubmissions };
