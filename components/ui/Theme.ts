import { createMuiTheme } from "@material-ui/core/styles";

//const ockhamBlue = "#0B72B9";
//const ockhamBlue = "#4169E1";
//const ockhamRed = "#ff4040";

const ockhamBlue: string = "#4F81BD";
const ockhamRed: string = "#E32F2B";
const ockhamGrey: string = "#868686";
const ockhamGreen: string = "#4caf50";

const theme = createMuiTheme({
  palette: {
    //common: {},
    primary: { main: ockhamBlue },
    secondary: { main: ockhamRed },
  },

  typography: {
    /*
    tab: {
      fontFamily: "Raleway ",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1.25rem",
      color: "white",
    },
    estimate: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1.25rem",
      color: "white",
    },
    */
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: `${ockhamBlue}`,
      lineHeight: 1.5, // space between lines of text
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: ockhamBlue,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: ockhamBlue,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: ockhamGrey,
    },
    subtitle2: {
      color: "white",
      fontSize: "1.25rem",
      fontWeight: 300,
    },
    body1: {
      fontSize: "1.25rem",
      color: ockhamGrey,
      fontWeight: 300,
    },
    /*
    learnButton: {
      borderColor: ockhamBlue,
      color: ockhamBlue,
      borderWidth: 2,
      textTransform: "none",
      borderRadius: 50,
      fontFamily: "roboto",
      fontWeight: "bold",
    },
    */
  },
});

/*
console.log("Theme keys");
console.log(Object.keys(theme));

console.log("Theme type");
console.log(typeof theme);

console.log("Theme mixins");
console.log(theme.mixins.toolbar);

console.log(theme.palette);
*/

export default theme;
