import { createTheme } from "@mui/material";

const sharedTheme = {
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 1050,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        a: {
          color: "inherit",
        },
        ':focus-visible': {
          outline: 'none'
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {

          backgroundColor: "#1e293b",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e293b",
        
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",

        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
  
   
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      }
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 8px",
        },
      },
    }
  },
  typography: {
    fontFamily: ' "Roboto", sans-serif',
    color: "#cbd5e1",
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
};

const appTheme = createTheme({
  ...sharedTheme,
  palette: {
  mode: "dark",
    primary: {
      main: "#1d4ed8",
    },
    secondary: {
      main: "#0f766e",
    },

   

  },
  components: {
    ...sharedTheme.components,

    MuiCssBaseline: {
      styleOverrides: {
        ...sharedTheme.components.MuiCssBaseline.styleOverrides,
        body: {
          color: "#cbd5e1",
          background: `
              radial-gradient(circle at 10% 0%, #2b3f5c 0%, transparent 35%),
    radial-gradient(circle at 85% 15%, #06353d 0%, transparent 30%),
    linear-gradient(150deg, #0d1117 0%, #131b24 45%, #1a2430 100%);
          `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      },
    },
  },
});



const themes = {
  app: appTheme,

};

export { appTheme, themes };

export default appTheme;