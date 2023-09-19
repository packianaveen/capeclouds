import React, { useState } from 'react';
import { styled, Container, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/icon-256x256.png';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import FooterPage from './header/Footer';
import Footer from './header/Footer';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <>
      <MainWrapper className="mainwrapper">
        <Box
          sx={{
            background: '#663399',
          }}
          className="topbar"
        >
          <Box
            sx={{
              // textAlign: 'center',
              height: '64px',
              display: 'flex',
              backgroundImage: `url('https://online.tirupatibalaji.ap.gov.in/misc/images/v4/TTD_MainBanner_Sky_Afternoon_N.png')`,
              borderBottomRightRadius: '30px',
              borderBottomLeftRadius: '30px',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          >
            <img src={logo} style={{ margin: '10px' }} />
            <p
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Cape Clouds
            </p>
          </Box>
        </Box>
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Main Wrapper */}
        {/* ------------------------------------------- */}
        <PageWrapper className="page-wrapper">
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          <Header
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Container
            sx={{
              paddingTop: '20px',
              maxWidth: '1200px',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Page Route */}
            {/* ------------------------------------------- */}
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Outlet />
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
        </PageWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};

export default FullLayout;
