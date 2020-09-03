import { createMuiTheme } from "@material-ui/core/styles";
// Create a theme instance.

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3B1C32",
    },
    secondary: {
      main: "#CA054D",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `'Montserrat', 'Helvetica', sans-serif`,
    button: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
      fontWeight: "bolder",
    },
    h1: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
    },
    h2: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
    },
    h3: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
    },
    h4: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
    },
    h5: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
    },
    h6: {
      fontFamily: `'Secular One', 'Helvetica', sans-serif`,
    },
  },
});

export default theme;
