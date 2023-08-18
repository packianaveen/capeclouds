import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import axios from 'axios';
// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import { PhoneEnabled } from '@mui/icons-material';
import bgvideo from 'src/assets/bg.mp4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login2 = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);
  const navigate = useNavigate();

  const verifyCaptcha = () => {
    console.log(phone);
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      },
    });
  };
  const submitLogin = () => {
    // verifyCaptcha();
    // console.log(phone);
    // const appVerifier = window.recaptchaVerifier;
    // signInWithPhoneNumber(auth, phone, appVerifier)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     console.log(confirmationResult);
    //     window.confirmationResult = confirmationResult;
    //     setVisibleOtp(true);
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    //   });

    axios.get(`http://localhost:7098/api/getPhone/${phone}`).then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        setLogin(true);
      } else {
        setLogin(false);
        setReg(true);
      }
    });
  };
  const submitAccLogin = () => {
    axios
      .post('http://localhost:7098/api/checkUser', {
        phone: phone,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          toast.success('SucessFully Updated');
          navigate('/admin');
        } else {
          toast.error('Password wrong');
        }

        // navigate('/admin');
      })
      .catch((error) => {
        toast.error('failed');
        console.log(error);
      });
  };
  const submitRegister = () => {
    axios
      .post('http://localhost:7098/api/userAd', {
        phone: phone,
        pin: pin,
        password: password,
      })
      .then((response) => {
        console.log(response);
        toast.success('SucessFully Updated');
        navigate('/admin');
      })
      .catch((error) => {
        toast.error('failed');
        console.log(error);
      });
  };
  // const submitOTP = () => {
  //   const confirmationResult = window.confirmationResult;
  //   confirmationResult
  //     .confirm(otp)
  //     .then((result) => {
  //       // User signed in successfully.
  //       const user = result.user;
  //       console.log('login sucess');
  //       // ...
  //     })
  //     .catch((error) => {
  //       // User couldn't sign in (bad verification code?)
  //       // ...
  //     });
  // };
  return (
    <PageContainer title="Login" description="this is Login page">
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
              <AuthLogin
                phone={phone}
                setPhone={setPhone}
                login={login}
                reg={reg}
                pin={pin}
                setPin={setPin}
                password={password}
                setPassword={setPassword}
                submitLogin={submitLogin}
                submitAccLogin={submitAccLogin}
                submitRegister={submitRegister}
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Login
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
        <div id="sign-in-button"></div>
      </Box>
    </PageContainer>
  );
};

export default Login2;
