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
const ProfileUpdate = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.phone);
    setPhone(user.phone);
  }, []);
  return (
    <PageContainer title="Profile Page">
      <DashboardCard title="Profile Page">
        <Box>
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
              {photo.length == 0 ? (
                <Button variant="contained" component="label" onChange={handlePhoto}>
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
              ) : (
                <Button variant="contained" component="label" onChange={handlePhoto}>
                  Re-Upload Image
                  <input type="file" accept="image/*" id="file" name="photo" hidden />
                </Button>
              )}
            </FormControl>
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProfileUpdate;
