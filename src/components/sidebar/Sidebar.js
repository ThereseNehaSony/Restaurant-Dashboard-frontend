// import React from 'react';
// import './Sidebar.css';
// import { List, ListItem, ListItemText } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// const logo = '/logo.png'

// const Sidebar = () => {
//   const menuItems = ['Dashboard', 'Order List', 'Order Detail', 'Customer', 'Analytics', 'Reviews', 'Foods' ,'Food Detail', 'Customer Detail', 'Calender' , 'Chat', 'Wallet' ];

//   return (
//     <div className="sidebar">
//      <img src={logo}/>
//       <List>
//         {menuItems.map((text, index) => (
//           <ListItem button key={index}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import './Sidebar.css';
import { List, ListItem, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreateIcon from '@mui/icons-material/Create';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const logo = '/logo.png'

['Dashboard', 'Order List', 'Order Detail', 'Customer', 'Analytics', 'Reviews', 'Foods' ,'Food Detail', 'Customer Detail', 'Calender' , 'Chat', 'Wallet' ];
const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon /> },
    { text: 'Order List', icon: <ListIcon /> },
    { text: 'Order Detail', icon: <InsertDriveFileIcon /> },
    { text: 'Customer', icon: <PeopleIcon /> },
    { text: 'Analytics', icon: <BarChartIcon /> },
    { text: 'Reviews', icon: <CreateIcon /> },
    { text: 'Foods', icon: <RestaurantMenuIcon /> },
    { text: 'Food Details', icon: <RestaurantMenuIcon /> },
    { text: 'Customer Detail', icon: <PeopleIcon /> },
    { text: 'Calendar', icon: <CalendarTodayIcon /> },
    { text: 'Chat', icon: <ChatIcon /> },
    { text: 'Wallet', icon: <AccountBalanceWalletIcon /> },
  ];

  return (
    <div className="sidebar">
       <img src="/logo.png" alt="FoodKo Logo" className="logo" />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            {item.icon}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
