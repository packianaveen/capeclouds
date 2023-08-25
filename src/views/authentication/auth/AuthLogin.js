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
        <CustomTextField
          id="otp"
          type="password"
          label="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          variant="outlined"
          fullWidth
        />
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
