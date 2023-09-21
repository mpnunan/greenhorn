/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAuth } from '../../utils/context/authContext';
import {
  createUserLiked,
  deleteUserLiked,
  getPostLiked,
  updateUserLiked,
} from '../../api/userLikedData';
import {
  createUserSaved,
  deleteUserSaved,
  getPostSaved,
  updateUserSaved,
} from '../../api/userSavedData';

export default function LikeSave({ submissionObj }) {
  const [likes, setLikes] = useState([]);
  const [saves, setSaves] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeId, setLikeId] = useState('');
  const [saveId, setSaveId] = useState('');
  const { user } = useAuth();

  const checkLiked = (array) => {
    array.forEach((like) => {
      if (like.userId === user.uid) {
        setLiked(true);
        setLikeId(like.id);
      } else {
        setLiked(false);
      }
    });
  };

  const checkSaved = (array) => {
    array.forEach((save) => {
      if (save.userId === user.uid) {
        setSaved(true);
        setSaveId(save.id);
      } else {
        setSaved(false);
      }
    });
  };

  const userInteractions = async (id) => {
    await Promise.all([
      getPostLiked(id), getPostSaved(id),
    ]).then(([likeArray, saveArray]) => {
      setLikes(likeArray);
      setSaves(saveArray);
    });
  };

  const createLike = () => {
    const payload = { submissionId: submissionObj.id, userId: user.uid };
    createUserLiked(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserLiked(patchPayload).then(() => {
        userInteractions(submissionObj.id);
      });
    });
  };

  const createSave = () => {
    const payload = { submissionObj, submissionId: submissionObj.id, userId: user.uid };
    createUserSaved(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserSaved(patchPayload).then(() => {
        userInteractions(submissionObj.id);
      });
    });
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      createLike();
    } else {
      setLiked(false);
      deleteUserLiked(likeId).then(() => userInteractions(submissionObj.id));
    }
  };

  const handleSave = () => {
    if (!saved) {
      setSaved(true);
      createSave();
    } else {
      setSaved(false);
      deleteUserSaved(saveId).then(() => userInteractions(submissionObj.id));
    }
  };

  useEffect(() => {
    userInteractions(submissionObj.id);
    return ((error) => {
      if (error) {
        Promise.reject(error);
      }
    });
  }, [submissionObj.id]);

  useEffect(() => {
    checkLiked(likes);
    return ((error) => {
      if (error) {
        Promise.reject(error);
      }
    });
  }, [likes]);

  useEffect(() => {
    checkSaved(saves);
    return ((error) => {
      if (error) {
        Promise.reject(error);
      }
    });
  }, [saves]);

  return (
    <div className="likeSaveContainer">
      <div>
        {likes.length}
        <Checkbox
          label={{ 'aria-label': 'Like Button' }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={liked}
          onChange={(handleLike)}
        />
      </div>
      <Checkbox
        label={{ 'aria-label': 'Save Button' }}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        checked={saved}
        onChange={handleSave}
      />
    </div>
  );
}

LikeSave.propTypes = {
  submissionObj: PropTypes.shape({
    id: PropTypes.string,
  }),
};

LikeSave.defaultProps = {
  submissionObj: {},
};
