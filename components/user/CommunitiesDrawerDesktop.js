import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { getAllCommunities } from '../../api/communityData';

export default function CommunitiesDrawerDesktop() {
  const [communities, setCommunities] = useState([]);

  const navCommuntities = () => {
    getAllCommunities().then(setCommunities);
  };

  const list = (anchor, communityList) => (
    <Box
      id="communitiesDrawer"
      sx={{
        bgcolor: 'transparent',
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 120,
        marginTop: '100px',
      }}
      role="presentation"
    >
      <Typography
        variant="h6"
        component="h2"
        align="center"
        sx={{
          color: 'rgb(5, 120, 5)',
        }}
      >
        Explore
      </Typography>
      <List>
        {communityList.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
          >
            <Link
              passHref
              href={`/communities/${item.id}`}
            >
              <ListItemButton
                sx={{
                  padding: '1px',
                  textAlign: 'center',
                  borderRadius: '4px',
                  ':hover': {
                    border: '1px solid antiquewhite',
                  },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    navCommuntities();
  }, []);

  return (
    <div>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open
          variant="permanent"
        >
          {list('left', communities)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
