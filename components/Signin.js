import React from 'react';
import { Button } from '@mui/material';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center"
      style={{
        height: 'fit-content',
        marginTop: '40vh',
        padding: '30px',
        margin: '0 auto',
        color: 'rgb(5, 120, 5)',
      }}
    >
      <h1>Welcome to <span style={{ color: 'rgb(5, 140, 5)' }}>greenhorn</span></h1>

      <Button
        type="button"
        variant="contained"
        color="success"
        sx={{
          width: '240px',
          color: 'antiquewhite',
          opacity: '.82',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        className="copy-btn"
        onClick={signIn}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
