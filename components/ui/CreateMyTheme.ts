import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

//const ockhamBlue = "#0B72B9";
//const ockhamBlue = "#4169E1";
//const ockhamRed = "#ff4040";
const ockhamBlue: string = "#4F81BD";
const ockhamRed: string = "#E32F2B";
const ockhamGrey: string = "#868686";
const ockhamGreen: string = "#4caf50";

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
      //common: {},
      primary: { main: ockhamBlue },
      secondary: { main: ockhamRed },
    },
    typography: {
      tab: {
        fontFamily: "Raleway",
        color: "white",
        fontSize: "1.125rem",
        fontWeight: 700,
        textTransform: "none",
      },
      contact: {
        fontFamily: "Raleway",
        color: "white",
        fontSize: "1.125rem",
        fontWeight: 700,
        textTransform: "none",
      },
    },
    ...options,
  });
}
