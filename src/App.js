import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { createContext, useEffect, useMemo, useState } from 'react';
import { baselightTheme } from './theme/DefaultColors';
import axios from 'axios';
import { MyContext } from './MyContext';
import { createTheme } from '@mui/material/styles';
import typography from './theme/Typography';
import { shadows } from './theme/Shadows';
import { useAuth } from 'src/routes/AuthProvider';
import { AuthProvider } from './routes/AuthProvider';
import './App.css';
import { url } from './constant';
function App() {
  const auth = useAuth();
  console.log(auth.user);
  const routing = useRoutes(Router(auth.user));
  // const theme = baselightTheme;
  const [themeColor, setTheme] = useState('#000000');
  const checkLoggedIn = () => {
    let token = JSON.parse(localStorage.getItem('user'));
    let login = token ? token.type : null;
    auth.login(login);
  };
  useEffect(() => {
    console.log('useEffect called');
    var currentLocation = window.location;
    console.log(currentLocation.host);
    checkLoggedIn();
  }, []);
  const theme = useMemo(
    () =>
      createTheme({
        direction: 'ltr',
        palette: {
          primary: {
            main: themeColor,
            light: '#ECF2FF',
            dark: '#4570EA',
          },
          secondary: {
            main: '#49BEFF',
            light: '#E8F7FF',
            dark: '#23afdb',
          },
          success: {
            main: '#13DEB9',
            light: '#E6FFFA',
            dark: '#02b3a9',
            contrastText: '#ffffff',
          },
          info: {
            main: '#539BFF',
            light: '#EBF3FE',
            dark: '#1682d4',
            contrastText: '#ffffff',
          },
          text: {
            disabled: '#000000',
          },
          error: {
            main: '#FA896B',
            light: '#FDEDE8',
            dark: '#f3704d',
            contrastText: '#ffffff',
          },
          warning: {
            main: '#FFAE1F',
            light: '#FEF5E5',
            dark: '#ae8e59',
            contrastText: '#ffffff',
          },
          purple: {
            A50: '#EBF3FE',
            A100: '#6610f2',
            A200: '#557fb9',
          },
          grey: {
            100: '#F2F6FA',
            200: '#EAEFF4',
            300: '#DFE5EF',
            400: '#7C8FAC',
            500: '#5A6A85',
            600: '#2A3547',
          },
          text: {
            primary: '#2A3547',
            secondary: '#5A6A85',
          },
          action: {
            disabledBackground: 'rgba(73,82,88,0.12)',
            hoverOpacity: 0.02,
            hover: '#f6f9fc',
          },
          divider: '#e5eaef',
        },
        typography,
        shadows,
      }),
    [themeColor],
  );
  console.log(theme.palette.primary.main);

  useEffect(() => {
    axios.get(`${url}/api/getTheme`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setTheme(response.data[0].colur);
      }
    });
  }, []);
  return (
    <MyContext.Provider value={{ themeColor, setTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </MyContext.Provider>
  );
}

export default App;
