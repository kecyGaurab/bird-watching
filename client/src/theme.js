import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002884",
      dark: "#002884"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#f5f5f5"
    }
  }
});

theme.overrides = {
  MuiCard: {
    root: {
      borderRadius: "10px"
    }
  },
  MuiContainer: {
    root: {
      padding: "10px 0"
    }
  },
  MuiTextField: {
    root: {
      backgroundColor: theme.palette.common.white,
      fontSize: "30px",
      borderRadius: "5px"
    }
  },

  MuiCardContent: {
    root: {
      // !important over the default &:last-child padding-bottom
      padding: `${theme.spacing(4)}px !important`
    }
  },
  MuiDialog: {
    root: {
      margin: `${theme.spacing(5)}px`
    },
    paperFullScreen: {
      backgroundColor: theme.palette.background.default
    }
  },
  MuiCardHeader: {
    root: {
      padding: theme.spacing(4),
      "& + .MuiCardContent-root": {
        paddingTop: "0 !important"
      }
    },
    title: {
      ...theme.typography.h6,
      color: theme.palette.text.secondary
    },
    action: {
      marginTop: 0,
      marginRight: 0,
      alignSelf: "center",
      display: "flex"
    }
  },
  MuiInputBase: {
    root: {
      borderRadius: "15px",
      height: "3.5em"
    }
  },
  MuiSvgIcon: {
    root: {
      paddingRight: "5px",
      fontSize: "30px"
    },
    fontSizeInherit: {
      fontSize: "60px",
      paddingTop: "25px"
    },
    fontSizeLarge: {
      fontSize: "50px"
    }
  },
  MuiButton: {
    root: {
      margin: "5px"
    },
    sizeLarge: {
      height: "55px"
    },
    outlinedSecondary: {
      backgroundColor: theme.palette.primary.main
    }
  },
  MuiAppBar: {
    root: {
      background: theme.palette.background.default
    },
    colorPrimary: {
      backgroundColor: theme.palette.background.default
    }
  }
  // MuiSelect: {
  //   select: {
  //     backgroundColor: theme.palette.primary.main
  //   }
  // }
};

export default theme;
