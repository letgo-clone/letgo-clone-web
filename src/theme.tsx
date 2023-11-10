import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: 'green',
    },
    error: {
      main: red.A400,
    },
  },
  breakpoints: {
    values: {
      xs: 576,
      sm: 768,
      md: 991,
      lg: 1200,
      xl: 1400,
    },
  },
});

export default theme;