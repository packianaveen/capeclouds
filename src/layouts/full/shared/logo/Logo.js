import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { styled, Typography } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  // height: '70px',
  // width: '180px',
  // overflow: 'hidden',
  // display: 'block',
}));

const Logo = () => {
  return <h2 to="/">Cape Clouds</h2>;
};

export default Logo;
