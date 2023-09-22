import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  FilledInput,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import MuiPhoneNumber from 'mui-phone-number';
import { ToastContainer, toast } from 'react-toastify';
import { url } from 'src/constant';

const ProfileUpdate = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState('');
  const [userDb, setuserDb] = useState('');
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setType(user.type);
    setPin(user.pin);

    axios.get(`${url}/api/getProfile/${user._id}`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setName(response.data[0].name);
        setAddress(response.data[0].address);
        setCity(response.data[0].city);
        setPhoto(response.data[0].photo);
        setuserDb(response.data[0]._id);
      }
    });
    setPhone(user.phone);
  }, []);
  const handleSave = () => {
    if (userDb.length > 0) {
      axios
        .delete(`${url}/api/delete-profile/${userDb}`)
        .then((response) => {
          axios
            .post(
              `${url}/api/profileSave`,
              {
                name: name,
                phone: phone,
                city: city,
                photo: photo,
                address: address,
                user: JSON.parse(localStorage.getItem('user'))._id,
              },
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
            .then((response) => {
              console.log(response.data[0]);
              toast.success('SucessFully Updated');
            })
            .catch((error) => {
              toast.error('failed');
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error('failed');
        });
    } else {
      axios
        .post(
          `${url}/api/profileSave`,
          {
            name: name,
            phone: phone,
            city: city,
            photo: photo,
            address: address,
            user: JSON.parse(localStorage.getItem('user'))._id,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((response) => {
          console.log(response.data[0]);
          toast.success('SucessFully Updated');
        })
        .catch((error) => {
          toast.error('failed');
          console.log(error);
        });
    }
  };
  console.log(photo);
  return (
    <PageContainer title="Profile Page">
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
      <DashboardCard title="Profile Page">
        <Box>
          <Typography>Personal Details</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Box m={1}>
              <MuiPhoneNumber
                style={{ marginBottom: '10px' }}
                fullWidth
                variant="outlined"
                value={phone}
                disabled
                defaultCountry={'in'}
                //   onChange={(value) => {
                //     setPhone(value);
                //   }}
              />
            </Box>
            <Box m={1}>
              <CustomTextField
                id="otp"
                type="text"
                label="Name"
                disabled
                value={pin}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box m={1}>
              <CustomTextField
                id="otp"
                type="text"
                label="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                variant="outlined"
                fullWidth
              />
            </Box>
            {/* </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          > */}
            <Box m={1}>
              <CustomTextField
                id="city"
                type="text"
                label="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box m={1}>
              <CustomTextField
                id="otp"
                type="address"
                label="Place"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <FormControl fullWidth>
              {typeof photo != 'string' || photo == '' ? (
                <Box m={2}>
                  <Button fullWidth variant="contained" component="label" onChange={handlePhoto}>
                    Upload Image
                    <input
                      type="file"
                      //    value={newad.photo && newad.photo}
                      accept="image/*"
                      id="file"
                      name="photo"
                      hidden
                    />
                  </Button>
                </Box>
              ) : (
                <Box m={2}>
                  <Button variant="contained" component="label" onChange={handlePhoto}>
                    Re-Upload Image
                    <input type="file" accept="image/*" id="file" name="photo" hidden />
                  </Button>
                </Box>
              )}
              <Box m={2}>
                <Button fullWidth variant="contained" component="label" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProfileUpdate;
