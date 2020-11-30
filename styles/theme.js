import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#311b92',
    },
    primaryLight: {
      main: '#4527a0'
    },
    secondary: {
      main: '#00c853',
    },
    secondaryDark: {
      main: '#009624'
    },
    error: {
      main: red.A400,
    },
    light: {
      main: '#fefefe'
    },
    dark: {
      main: '#102027'
    },
    background: {
      default: '#eee',
    },
  },
  typography: {
    fontFamily: ["Lato", "Ubuntu", "Roboto"].join(","),
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
      },
      containedPrimary: {
        color: "#fff",
      },
    },

    MuiFab: {
      primary: {
        color: "#fff",
      },
    },
  },

});

export default theme;
