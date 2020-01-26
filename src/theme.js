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
  MuiCardHeader: {
    title: {
      overflow: 'hidden',
    },
  },
  MuiTextField: {
    root: {
      backgroundColor: theme.palette.common.white,
      fontSize: '20px',
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
};

export default theme;
