import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

export default function UserProfile({ userObj }) {
  return (
    <Card
      id="profileCard"
      sx={{
        bgcolor: 'rgb(5, 50, 5)',
      }}
    >
      <CardContent className="profileCardContent">
        <Typography variant="h2" component="h1">
          {userObj.displayName}
        </Typography>
        <Typography
          variant="body"
          align="center"
          sx={{
            color: 'antiquewhite',
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
