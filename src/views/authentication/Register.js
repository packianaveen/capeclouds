import React, { useState } from 'react';
import { Grid, Box, Card, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import MuiPhoneNumber from 'mui-phone-number';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../routes/AuthProvider';
import { url } from 'src/constant';
const Register2 = () => {
  // let { phone } = useParams();
  let id = useParams();
  console.log(id.phone);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const submitRegister = () => {
    axios
      .post(`${url}/api/userAd`, {
        phone: phone,
        pin: pin,
        password: password,
        admin: id.phone,
        type: '2',
      })
      .then((response) => {
        console.log(response);
        let roles = response.data;
        toast.success('SucessFully Updated');
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.login(roles.type);
        if (roles.type == 1) {
          navigate('/', { replace: true });
        } else {
          navigate('/catogeries', { replace: true });
        }
      })
      .catch((error) => {
        toast.error('failed');
        console.log(error);
      });
  };
  return (
    <PageContainer title="Register" description="this is Register page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        {/* <iframe
          height="100%"
          width="100%"
          src="https://player.vimeo.com/video/342176725?title=0&portrait=0&byline=0&autoplay=1&muted=true"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe> */}
        {/* <video src={bgvideo} height="100%" width="100%" muted autoplay loop></video> */}
        <img src="https://wallpaperaccess.com/full/955066.jpg" height="100%" width="100%" />
      </section>
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src="https://capeclouds.in/assets/images/vle_logo.png"
                  height="200px"
                  width="200px"
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {/* <AuthRegister
              subtitle={
                <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Already have an Account?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/auth/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            /> */}
              <Box>
                <MuiPhoneNumber
                  style={{ marginBottom: '10px' }}
                  fullWidth
                  variant="outlined"
                  value={phone}
                  // disabled={login || reg}
                  defaultCountry={'in'}
                  onChange={(value) => {
                    setPhone(value);
                  }}
                />
              </Box>
              <Box>
                <CustomTextField
                  id="otp"
                  type="password"
                  label="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box>
                <CustomTextField
                  style={{ marginTop: '10px' }}
                  id="otp"
                  label="Pin code"
                  onChange={(e) => {
                    setPin(e.target.value);
                  }}
                  value={pin}
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box m={3}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={!password || !pin}
                  // component={Link}
                  to="/"
                  type="submit"
                  onClick={submitRegister}
                >
                  Submit
                </Button>
              </Box>
              {/* <Box m={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button fullWidth variant="contained">
                Manual Registration
              </Button>
            </Box>
            <Box m={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button fullWidth variant="contained">
                Scan QR Code
              </Button>
            </Box> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register2;
