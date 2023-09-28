import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import {
  HandymanOutlined,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';

export default function CommunitiesDrawer() {
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
      id="communitiesDrawer"
      sx={{ bgcolor: 'transparent', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="MyProfile" disablePadding>
          <Link passHref href={`/user/profile/${user.displayName}`}>
            <ListItemButton>
              <ListItemIcon>
                {user.photoURL ? <Avatar src={user.photoURL} /> : <HandymanOutlined /> }
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Button
          sx={{
            color: 'antiquewhite',
            marginLeft: '20px',
            ':hover': {
              border: '1px solid antiquewhite',
            },
          }}
          onClick={toggleDrawer('left', true)}
        >
          {user.displayName}
        </Button>
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
