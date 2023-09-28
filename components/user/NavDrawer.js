import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import {
  AccountBox,
  Construction,
  DynamicFeed,
  ExitToApp,
  Forum,
  People,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

export default function NavDrawer() {
  const { user } = useAuth();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      id="drawerPaper"
      sx={{ bgcolor: 'antiquewhite', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="MyProfile" disablePadding>
          <Link passHref href={`/user/profile/${user.displayName}`}>
            <ListItemButton>
              <ListItemIcon>
                {user.photoURL ? <Avatar src={user.photoURL} /> : <AccountBox /> }
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="MySubmissions" disablePadding>
          <Link passHref href="/user/submissions">
            <ListItemButton>
              <ListItemIcon>
                <Forum />
              </ListItemIcon>
              <ListItemText primary="My Submissions" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="MyCommunities" disablePadding>
          <Link passHref href="/user/myCommunities">
            <ListItemButton>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="My Communities" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="MySavedPosts" disablePadding>
          <Link passHref href="/user/savedSubmissions">
            <ListItemButton>
              <ListItemIcon>
                <DynamicFeed />
              </ListItemIcon>
              <ListItemText primary="My Saved Posts" />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider />
      </List>
      <Divider />
      <List>
        <ListItem key="CreatCommunity" disablePadding>
          <Link passHref href="/communities/newCommunity">
            <ListItemButton>
              <ListItemIcon>
                <Construction />
              </ListItemIcon>
              <ListItemText primary="Build a Community" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="SignOut" disablePadding>
          <ListItemButton
            onClick={signOut}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button
          sx={{
            color: 'antiquewhite',
            width: 'fit-content',
            whiteSpace: 'nowrap',
            height: 'fit-content',
            marginLeft: '20px',
            ':hover': {
              border: '1px solid antiquewhite',
            },
          }}
          onClick={toggleDrawer('right', true)}
        >
          {user.displayName}
        </Button>
        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
