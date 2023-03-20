import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: '#20b000',
    },
    secondary: {
      main: '#f49b02',
    },
  },

  typography:{
    fontSize: 12,
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
      },
    },
  },
});

export default theme;
