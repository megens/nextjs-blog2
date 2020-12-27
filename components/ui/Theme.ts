import { createMuiTheme } from "@material-ui/core/styles";

//const ockhamBlue = "#0B72B9";
//const ockhamBlue = "#4169E1";
//const ockhamRed = "#ff4040";

const ockhamBlue: string = "#4F81BD";
const ockhamRed: string = "#E32F2B";
const ockhamGrey: string = "#868686";
const ockhamGreen: string = "#4caf50";

const theme = createMuiTheme({
  palette: { primary: { main: ockhamBlue }, secondary: { main: ockhamRed } },
});

console.log(Object.keys(theme.palette));
console.log(theme.palette);

export default theme;
