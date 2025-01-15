import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import { Button } from '@mui/material'; // Added Button component
import { FaTachometerAlt, FaClipboardList, FaFilter, FaChartBar, FaUsers, FaPencilAlt, FaUserCircle } from 'react-icons/fa';
import { AiFillProduct } from 'react-icons/ai';
import { IoPhonePortrait } from "react-icons/io5";
import { RiLogoutBoxFill, RiFileUploadFill } from 'react-icons/ri';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const MiniDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = useState(false); // State for managing the dropdown
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUploadClick = () => {
    setOpenUpload(!openUpload); // Toggle the dropdown
  };

  const navItems = [
    { name: 'Dashboard', to: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Orders', to: '/orders', icon: <FaClipboardList /> },
    { name: 'Sales Data', to: '/salesData', icon: <FaChartBar /> },
    { name: 'Dealers', to: '/dealers', icon: <FaPencilAlt /> },
    { name: 'Extraction', to: '/extraction', icon: <FaFilter /> },
    { name: 'Segment', to: '/segment', icon: <AiFillProduct /> },
    { name: 'Users', to: '/users', icon: <FaUsers /> },
    // { name: 'Model', to: '/model', icon: <IoPhonePortrait /> },
    {
      name: 'Upload',
      icon: <RiFileUploadFill />,
      onClick: handleUploadClick, // Add click handler to toggle dropdown
    },
    { name: 'Profile', to: '/profile', icon: <FaUserCircle /> },
    {
      name: 'Logout',
      icon: <RiLogoutBoxFill />,
      action: () => {
        localStorage.removeItem('isAuthenticated'); 
        navigate('/login'); 
      },
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Siddha Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={item.name} arrow placement="right">
                <ListItemButton
                  component={item.action ? undefined : Link} // Only add Link for navigation
                  to={item.to} // Use 'to' only if navigation is present
                  onClick={item.onClick || item.action} // Use onClick for dropdown toggle or logout action
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
              {/* Show dropdown for Upload */}
              {item.name === 'Upload' && (
                <Collapse in={openUpload} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton component="div" sx={{ px: 2.5 }}>
                      <Button 
                        variant="outlined" 
                        fullWidth 
                        component={Link} 
                        to="/upload-tally-transaction"
                        // sx={{ mb: 1 }}
                      >
                        Tally Transaction
                      </Button>
                    </ListItemButton>
                    <ListItemButton component="div" sx={{ px: 2.5 }}>
                      <Button 
                        variant="outlined" 
                        fullWidth 
                        component={Link} 
                        to="/upload-extraction"
                      >
                        Extraction Data
                      </Button>
                    </ListItemButton>
                  </List>
                </Collapse>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
