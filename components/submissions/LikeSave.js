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

  const checkLike = (array) => {
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

  const userInteractions = async () => {
    await Promise.all([
      getPostLiked(submissionId), getPostSaved(submissionId),
    ]).then(([likeArray, saveArray]) => {
      setLikes(likeArray);
      setSaves(saveArray);
    });
  };

  const createLike = () => {
    const payload = { submissionId: { submissionId }, userId: user.uid };
    createUserLiked(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserLiked(patchPayload).then(() => {
        userInteractions();
      });
    });
  };

  const createSave = () => {
    const payload = { submissionId: { submissionId }, userId: user.uid };
    createUserSaved(payload).then(({ name }) => {
      const patchPayload = { id: name };
      updateUserSaved(patchPayload).then(() => {
        userInteractions();
      });
    });
  };

  const handleLike = () => {
    if (liked) {
      deleteUserLiked(likeId);
    } else createLike();
  };

  const handleSave = () => {
    if (saved) {
      deleteUserSaved(saveId);
    } else createSave();
  };

  useEffect(() => {
    userInteractions();
  }, []);

  useEffect(() => {
    checkLike(likes);
  }, [likes]);

  useEffect(() => {
    checkSaved(saves);
  }, [saves]);

  return (
    <div>
      <Checkbox
        {...label}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={liked}
        onChange={(handleLike)}
      />
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
  submissionId: PropTypes.string.isRequired,
};
