//import { createMuiTheme } from "@material-ui/core/styles";
// switching to typescript approach
import createMyTheme from "./CreateMyTheme";

const theme = createMyTheme({}); // here is where I can overwrite keys, but I can't get this to work for one key among many

console.log("Theme keys");
console.log(Object.keys(theme));

export default theme;

/*
console.log("Theme type");
console.log(typeof theme);

console.log("Theme mixins");
console.log(theme.mixins.toolbar);

console.log(theme.palette);
*/
