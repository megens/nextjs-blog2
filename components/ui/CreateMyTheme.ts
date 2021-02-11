import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

//const ockhamBlue = "#0B72B9";
//const ockhamBlue = "#4169E1";
//const ockhamRed = "#ff4040";
const ockhamBlue: string = "#4F81BD";
//const ockhamRed: string = "#E32F2B";
//const ockhamRed: string = "#ff4040";
const ockhamRed: string = "#F9503F";
const ockhamGrey: string = "#868686";
const ockhamGreen: string = "#4caf50";

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
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
      learnButton: {
        borderColor: ockhamBlue,
        color: ockhamBlue,
        borderWidth: 2,
        textTransform: "none",
        borderRadius: 50,
        fontFamily: "roboto",
        fontWeight: "bold",
      },
      h2: {
        fontFamily: "Raleway",
        fontWeight: 700,
        fontSize: "2.5rem",
        color: ockhamBlue,
        lineHeight: 1.5, // space between lines of text
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
    },
    ...options,
  });
}
