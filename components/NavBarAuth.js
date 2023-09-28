/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { Button, Typography } from '@mui/material';
import NavDrawer from './user/NavDrawer';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Link passHref href="/">
          <Typography
            id="logo"
            variant="h2"
            component="h3"
            sx={{
              color: 'rgb(5, 100, 5)',
              ':hover': {
                cursor: 'pointer',
                color: 'rgb(5, 160, 5)',
              },
            }}
          >greenhorn
          </Typography>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/requests/openRequests">
              <Button sx={{
                color: 'antiquewhite',
                marginLeft: '20px',
                ':hover': {
                  border: '1px solid antiquewhite',
                },
              }}
              >
                Open Requests
              </Button>
            </Link>
            <Link passHref href="/submission/submitNew">
              <Button sx={{
                color: 'antiquewhite',
                ':hover': {
                  border: '1px solid antiquewhite',
                },
              }}
              >
                Contribute
              </Button>
            </Link>
          </Nav>
          <NavDrawer />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
