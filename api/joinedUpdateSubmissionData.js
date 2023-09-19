import { getPostSaved, updateUserSaved } from './userSavedData';

const updateSavedData = async (payload) => {
  const updatedSubmissionData = await getPostSaved(payload.id).then((saveObjects) => {
    if (saveObjects.length) {
      saveObjects.forEach((saveObj) => {
        updateUserSaved(saveObj.id, payload);
      });
    }
  });
  return updatedSubmissionData;
};

export default updateSavedData;
