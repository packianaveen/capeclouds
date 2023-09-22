import React, { useEffect, useState } from 'react';
import { styled, Container, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/icon-256x256.png';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import FooterPage from './header/Footer';
import Footer from './header/Footer';
import { url } from 'src/constant';
import axios from 'axios';

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
  const [topText, setToptext] = useState('');
  const [name, setName] = useState('Cape Clouds');
  const [font, setFont] = useState(20);
  const admin = JSON.parse(localStorage.getItem('user')).admin;
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  useEffect(() => {
    if (admin) {
      axios.get(`${url}/api/editCenter/${admin}`).then((response) => {
        axios.get(`${url}/api/getuser/${response.data.admin}`).then((res) => {
          console.log(res.data);
          setName(res.data.name);
          setFont(res.data.font);
        });
      });
    } else {
      setName(JSON.parse(localStorage.getItem('user')).name);
      setFont(JSON.parse(localStorage.getItem('user')).font);
    }
  }, []);
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
                margin: 'auto',
                width: '70%',
                display: 'flex',
                marginTop: '20px',
                fontSize: font ? font : '20px',
                fontWeight: 'bolder',
              }}
            >
              {name ? name : 'Cape Clouds'}
            </p>
          </Box>
        </Box>
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar
          name={name}
          font={font}
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
