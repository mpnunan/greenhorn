/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { Button } from '@mui/material';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBarAuth() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>greenhorn</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/openRequests">
              <Nav.Link>Open Requests</Nav.Link>
            </Link>
          </Nav>
          <Link passHref href={`/user/profile/${user.displayName}`}>
            <Button>
              {user.displayName}
            </Button>
          </Link>
          <Button onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
