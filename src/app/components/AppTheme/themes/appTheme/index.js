import { createTheme } from "@mui/material";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#39ff14",
    },
    secondary: {
      main: "#ff006e",
    },
    info: {
      main: "#00f5ff",
    },
    mode: "dark",
  },
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 850,
    },
  },
  shape: {
    borderRadius: 20,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#141435",
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        size: "grow",
        spacing: 2,
      },
      styleOverrides: {
        root: {
          alignItems: "center",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 2,
      }
    }
  },
});

const themes = {
  app: appTheme,
};

export { appTheme, themes };

export default appTheme;
