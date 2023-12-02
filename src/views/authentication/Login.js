import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import axios from 'axios';
// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { PhoneEnabled } from '@mui/icons-material';
import bgvideo from 'src/assets/bg.mp4';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../routes/AuthProvider';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { url } from '../../constant';
import { replace } from 'lodash';
import Modal from '@mui/material/Modal';
import { QrReader } from 'react-qr-reader';
const Login2 = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState('');
  const [type, setType] = useState('password');
  // const navigate = useNavigate();
  let { id } = useParams();
  const auth = useAuth();
  console.log(id);
  const navigate = useNavigate();
  const location = useLocation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const from = location.state?.from?.pathname || '/';
  console.log(auth.user);
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
    axios.get(`${url}/api/getPhone/${phone}`).then((response) => {
      if (response.data.length > 0) {
        setCurrent(response.data[0]._id);
        localStorage.setItem('user', JSON.stringify(response.data[0]));
        console.log(response.data[0]);
        setLogin(true);
      } else {
        navigate(`/auth/register/${phone}/${id}`, { replace: true });
        // setLogin(false);
        // setReg(true);
      }
    });
  };
  const handleToggle = () => {
    console.log(type);
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    boxShadow: 24,
    p: 4,
  };
  const submitAccLogin = () => {
    axios
      .post(`${url}/api/checkUser`, {
        phone: phone,
        password: password,
      })
      .then((response) => {
        console.log(response.data[0]);
        if (response.data.length > 0) {
          let roles = response.data[0];
          toast.success('SucessFully Updated');
          localStorage.setItem('user', JSON.stringify(response.data[0]));
          auth.login(roles.type);
          if (roles.type == 1 || roles.type == 3) {
            navigate('/', { replace: true });
          } else {
            navigate('/catogeries', { replace: true });
          }
        } else {
          toast.error('Password Wrong');
        }

        // navigate('/admin');
      })
      .catch((error) => {
        toast.error('failed');
        console.log(error);
      });
  };
  const handleForget = () => {
    navigate(`/auth/forgetpassword/${current}`, { replace: true });
  };
  const submitRegister = () => {
    axios
      .post(`${url}/api/userAd`, {
        phone: phone,
        pin: pin,
        password: password,
        type: 2,
      })
      .then((response) => {
        console.log(response);
        toast.success('SucessFully Updated');
        // navigate('/');
      })
      .catch((error) => {
        toast.error('failed');
        console.log(error);
      });
  };

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
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
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
                type={type}
                handleToggle={handleToggle}
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
                handleForget={handleForget}
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
              {phone.length > 10 ? (
                <p style={{ textAlign: 'center' }} onClick={handleOpen}>
                  Scan Qr Code
                </p>
              ) : (
                ''
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form">
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (!!result) {
                console.log(`/auth/login/${result?.text}`);
                navigate(`/auth/login/${result?.text}`);
                handleClose();
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
          {/* <p>{data}</p> */}
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default Login2;
