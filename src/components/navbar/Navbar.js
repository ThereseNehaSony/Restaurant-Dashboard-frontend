import React from 'react';
import { AppBar, Toolbar, InputBase, Box, IconButton, Badge, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import RedeemIcon from '@mui/icons-material/Redeem';
import './Navbar.css';

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
       
        <Box display="flex" alignItems="center" flexGrow={1}>
          <div className="search-bar">
            <InputBase
              placeholder="Search…"
              className="search-input"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton className="search-icon">
              <SearchIcon />
            </IconButton>
          </div>
        </Box>

       
        <Box display="flex" alignItems="center" className="icons-container">
          <Badge badgeContent={3} color="primary" className="icon-box">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Badge>
          <Badge badgeContent={2} color="error" className="icon-box">
            <IconButton>
              <MessageIcon />
            </IconButton>
          </Badge>
          
          <Badge badgeContent={4} color="error" className="icon-box">
            <IconButton>
              <RedeemIcon />
            </IconButton>
          </Badge>
          <Badge badgeContent={1} color="error" className="icon-box">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Badge>
        </Box>

        
        
        <Box ml={2}>
          <Typography variant="h6" className="greeting">
            Hello, Samantha
          </Typography>
         
        </Box>
        <img src="/lady.jpg" alt="user"  style={{ width: '50px',  height: '40px', borderRadius: '50%', marginLeft: '10px' }}  />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
