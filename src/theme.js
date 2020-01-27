import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#002884',
      dark: '#002884',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#757575',
    },
  },
});

theme.overrides = {
  MuiCard: {
    root: {
      borderRadius: '10px',
    },
  },
  MuiContainer: {
    root: {
      padding: '10px 0',
    },
  },
  MuiCardHeader: {
    title: {
      overflow: 'hidden',
    },
  },
  MuiTextField: {
    root: {
      backgroundColor: theme.palette.common.white,
      fontSize: '30px',
      borderRadius: '5px',
    },
  },
  MuiSelect: {
    root: {
      color: theme.palette.common.white,
    },
  },
  MuiCardContent: {
    root: {
      paddingTop: '2px',
      paddingBottom: '2px',
    },
  },
  MuiInputBase: {
    root: {
      borderRadius: '15px',
      height: '3.5em',
    },
  },
  MuiSvgIcon: {
    root: {
      paddingRight: '5px',
      fontSize: '30px',
    },
    fontSizeInherit: {
      fontSize: '60px',
      paddingTop: '25px',
    },
    fontSizeLarge: {
      fontSize: '50px',
    },
  },
  MuiButton: {
    sizeLarge: {
      height: '55px',
    },
    containedPrimary: {
      backgroundColor: 'green',
      color: theme.palette.background.default,
    },
    label: {
      color: 'white',
    },
  },
};

export default theme;
