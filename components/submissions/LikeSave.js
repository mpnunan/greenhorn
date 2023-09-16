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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function LikeSave({ submissionId }) {
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
    const payload = { submissionId, userId: user.uid };
    createUserLiked(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserLiked(patchPayload).then(() => {
        userInteractions(submissionId);
      });
    });
  };

  const createSave = () => {
    const payload = { submissionId, userId: user.uid };
    createUserSaved(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserSaved(patchPayload).then(() => {
        userInteractions(submissionId);
      });
    });
  };

  const handleLike = () => {
    setLiked(false);
    if (!liked) {
      setLiked(true);
      createLike();
    } else deleteUserLiked(likeId).then(() => userInteractions(submissionId));
  };

  const handleSave = () => {
    setSaved(false);
    if (!saved) {
      setSaved(true);
      createSave();
    } else deleteUserSaved(saveId).then(() => userInteractions(submissionId));
  };

  useEffect(() => {
    userInteractions(submissionId);
    return ((error) => {
      if (error) {
        Promise.reject(error);
      }
    });
  }, [submissionId]);

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
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={liked}
          onChange={(handleLike)}
        />
      </div>
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        checked={saved}
        onChange={handleSave}
      />
    </div>
  );
}

LikeSave.propTypes = {
  submissionId: PropTypes.string,
};

LikeSave.defaultProps = {
  submissionId: '',
};