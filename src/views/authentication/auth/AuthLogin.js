import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { InputAdornment, IconButton } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import MuiPhoneNumber from 'mui-phone-number';

const AuthLogin = ({
  title,
  subtitle,
  subtext,
  password,
  pin,
  setPassword,
  setPin,
  setPhone,
  login,
  submitLogin,
  submitAccLogin,
  submitRegister,
  handleToggle,
  type,
  reg,
}) => (
  <>
    {/* {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null} */}

    {subtext}

    <Stack display="flex" alignItems="center" justifyContent="center">
      <MuiPhoneNumber
        style={{ marginBottom: '10px' }}
        fullWidth
        variant="outlined"
        disabled={login || reg}
        defaultCountry={'in'}
        onChange={(value) => {
          setPhone(value);
        }}
      />

      {login || reg ? (
        <>
          <CustomTextField
            id="otp"
            type={type}
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            variant="outlined"
            fullWidth
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleToggle}>
                    {type == 'password' ? <IconEyeOff /> : <IconEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <span style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handleToggle}>
            {type == 'password' ? (
              <IconEyeOff
                onClick={() => {
                  console.log('hai');
                }}
                // style={{
                //   display: 'flex',
                //   marginTop: '-35px',
                //   marginRight: '-124px',
                // }}
              />
            ) : (
              <IconEye
                style={{
                  display: 'flex',
                  marginTop: '-35px',
                  marginRight: '-124px',
                }}
              />
            )}
          </span> */}
        </>
      ) : (
        ''
      )}
      {reg ? (
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
      ) : (
        ''
      )}
    </Stack>
    <Box mt={3}>
      {login || reg ? (
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          to="/"
          type="submit"
          onClick={reg ? submitRegister : submitAccLogin}
        >
          Submit
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          to="/"
          type="submit"
          onClick={submitLogin}
        >
          Login
        </Button>
      )}
    </Box>
    {/* {subtitle} */}
  </>
);

export default AuthLogin;
