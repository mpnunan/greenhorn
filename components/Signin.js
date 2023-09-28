import React from 'react';
import { Button } from '@mui/material';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'rgb(5, 120, 5)',
      }}
    >
      <h1>Welcome</h1>

      <Button type="button" variant="contained" color="success" sx={{ color: 'antiquewhite', opacity: '.8' }} className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
