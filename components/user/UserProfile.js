import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

export default function UserProfile({ userObj }) {
  return (
    <Card
      sx={{
        bgcolor: 'rgb(5, 50, 5)',
      }}
    >
      <CardContent>
        <Typography variant="h2" component="h1">
          {userObj.displayName}
        </Typography>
        <Typography
          variant="body"
          sx={{
            color: 'antiquewhite',
            textAlign: 'center',
          }}
        >
          {userObj.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

UserProfile.propTypes = {
  userObj: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
