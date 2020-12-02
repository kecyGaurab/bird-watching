import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002884',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#e0e0e0',
      light: '#FFFFFF',
    },
  },
  typography: {
    h3: {
      fontWeight: 500,
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
  MuiTextField: {
    root: {
      fontSize: '10px',
      borderRadius: '5px',
    },
  },

  MuiCardContent: {
    root: {
      padding: `${theme.spacing(3)}px !important`,
    },
  },
  MuiCardMedia: {
    root: {
      height: 0,
      paddingTop: '56.25%',
      margin: '0 10% 0 10%',
    },
  },
  MuiDialog: {
    root: {
      margin: `${theme.spacing(5)}px`,
    },
    paperFullScreen: {
      backgroundColor: theme.palette.background.default,
    },
  },
  MuiCardHeader: {
    root: {
      padding: theme.spacing(4),
      '& + .MuiCardContent-root': {
        paddingTop: '0 !important',
      },
    },
    title: {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
    },
    action: {
      marginTop: 0,
      marginRight: 0,
      alignSelf: 'center',
      display: 'flex',
    },
  },
  MuiInputBase: {
    root: {
      borderRadius: '15px',
      height: '3.5rem',
      width: '80%',
    },
  },
  MuiSvgIcon: {
    root: {
      fontSize: '30px',
    },
    fontSizeLarge: {
      fontSize: '50px',
    },
  },
  MuiButton: {
    root: {
      margin: '5px 5px 5px 0px',
    },
    sizeLarge: {
      height: '55px',
      color: '#FFFFFF',
      border: ' 2px solid #FFFFFF',
      fontWeight: '600',
    },
    outlinedSecondary: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  MuiAppBar: {
    root: {
      background: theme.palette.background.default,
    },
    colorPrimary: {
      backgroundColor: theme.palette.background.light,
    },
  },
  MuiAlert: {
    root: {
      marginTop: '15px',
    },
  },
  MuiAvatar: {
    root: {
      fontWeight: 600,
    },
    colorDefault: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  MuiPaper: {
    elevation4: {
      boxShadow: 'none',
    },
  },
};

if (process.env.NODE_ENV !== 'production') {
  // console.log the theme config object to the window console for debugging.
  console.log(theme);
}
export default theme;
