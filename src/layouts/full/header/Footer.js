import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu2 } from '@tabler/icons';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import Link from '@mui/material/Link';

const Footer = (props) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          padding: '4px',
          margin: '3px',
          // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: 'white',
          // width: '100%',
          // border: '1px solid',
          // borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
          // borderRadius: 2,
          // fontSize: '0.875rem',
          fontWeight: '400',
          ...sx,
        }}
        {...other}
      />
    );
  }

  Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
  };
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.primary.main,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="footer" style={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <Item>
          <Link href="https://www.facebook.com/" color="inherit" sx={{ pl: 2, pr: 2 }}>
            <Facebook />
          </Link>
          <Link href="https://www.instagram.com/" color="inherit" sx={{ pl: 2, pr: 2 }}>
            <Instagram />
          </Link>
          <Link href="https://www.twitter.com/" color="inherit" sx={{ pl: 2, pr: 2 }}>
            <Twitter />
          </Link>
          <Link href="https://www.twitter.com/" color="inherit" sx={{ pl: 2, pr: 2 }}>
            <YouTube />
          </Link>
        </Item>
        <Item>Call Center (24X7) : +91 9345278844</Item>{' '}
        <Item>Copyright © 2023 Cape clouds - All rights reserved</Item>
        <Item>Terms and conditions</Item>
      </Box>
    </div>
  );
};

Footer.propTypes = {
  sx: PropTypes.object,
};

export default Footer;
