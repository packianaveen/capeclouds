import { useMediaQuery, Box, Drawer, useTheme } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const theme = useTheme();
  const sidebarWidth = '270px';
  console.log(props);
  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.info.contrastText,
                minHeight: '70px',
              }}
            >
              <h2 to="/"> {props.name ? props.name : 'Cape Clouds'}</h2>
            </Box>
            <Box>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box
        px={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.info.contrastText,
          minHeight: '70px',
        }}
      >
        <h2 to="/"> {props.name ? props.name : 'Cape Clouds'}</h2>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems closeSidebar={props.onSidebarClose} />
      {/* <Upgrade /> */}
    </Drawer>
  );
};

export default Sidebar;
