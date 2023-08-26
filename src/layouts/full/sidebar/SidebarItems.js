import React from 'react';
import { Menuitems, userMenu } from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useAuth } from 'src/routes/AuthProvider';

const SidebarItems = (props) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const auth = useAuth();
  const path = auth.user == 1 ? Menuitems : userMenu;
  console.log(props);
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 2 }} className="sidebarNav">
        {path.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={props.closeSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
