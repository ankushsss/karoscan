// import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
// import red from '@material-ui/core/colors/red';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: "red",
    },
    background: {
      default: '#fff',
    },
  },
});
