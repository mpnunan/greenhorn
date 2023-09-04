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
  DynamicFeed,
  ExitToApp,
  Forum,
  People,
} from '@mui/icons-material';
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
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="MyProfile" disablePadding>
          <Link passHref href={`/user/profile/${user.displayName}`}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="MySubmissions" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Forum />
            </ListItemIcon>
            <ListItemText primary="My Submissions" />
          </ListItemButton>
        </ListItem>
        <ListItem key="MyCommunities" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="My Communities" />
          </ListItemButton>
        </ListItem>
        <ListItem key="MySavedPosts" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DynamicFeed />
            </ListItemIcon>
            <ListItemText primary="My Saved Posts" />
          </ListItemButton>
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
      <React.Fragment key="left">
        <Button onClick={toggleDrawer('left', true)}>{user.displayName}</Button>
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}