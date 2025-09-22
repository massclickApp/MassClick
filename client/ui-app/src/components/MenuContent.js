import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/dashboard/home' },
  { text: 'Category', icon: <AnalyticsRoundedIcon />, path: '/dashboard/category' },
  { text: 'Location', icon: <AnalyticsRoundedIcon />, path: '/dashboard/location' },
  { text: 'Business', icon: <AnalyticsRoundedIcon />, path: '/dashboard/business' },
  { text: 'Clients', icon: <PeopleRoundedIcon />, path: '/dashboard/clients' },
  { text: 'Users', icon: <PeopleRoundedIcon />, path: '/dashboard/user' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: '/dashboard/tasks' },
];

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: 'block', mb: 1 }} 
          >
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1, 
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>
                {item.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
