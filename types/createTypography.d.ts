import * as createTypography from "@material-ui/core/styles/createTypography";

declare module "@material-ui/core/styles/createTypography" {
  interface Typography {
    tab: {
      fontFamily: React.CSSProperties["fontFamily"];
      fontWeight: React.CSSProperties["fontWeight"];
      fontSize: React.CSSProperties["fontSize"];
      color: React.CSSProperties["color"];
      textTransform: React.CSSProperties["textTransform"];
    };
    contact: {
      fontFamily: React.CSSProperties["fontFamily"];
      fontWeight: React.CSSProperties["fontWeight"];
      fontSize: React.CSSProperties["fontSize"];
      color: React.CSSProperties["color"];
      textTransform: React.CSSProperties["textTransform"];
    };
    learnButton: {
      borderColor: React.CSSProperties["color"];
      color: React.CSSProperties["color"];
      borderWidth: React.CSSProperties["borderWidth"];
      textTransform: React.CSSProperties["textTransform"];
      borderRadius: React.CSSProperties["borderRadius"];
      fontFamily: React.CSSProperties["fontFamily"];
      fontWeight: React.CSSProperties["fontWeight"];
    };
  }

  interface TypographyOptions {
    tab?: {
      fontFamily?: React.CSSProperties["fontFamily"];
      fontWeight?: React.CSSProperties["fontWeight"];
      fontSize?: React.CSSProperties["fontSize"];
      color?: React.CSSProperties["color"];
      textTransform?: React.CSSProperties["textTransform"];
      /*
       */
    };
    contact?: {
      fontFamily?: React.CSSProperties["fontFamily"];
      fontWeight?: React.CSSProperties["fontWeight"];
      fontSize?: React.CSSProperties["fontSize"];
      color?: React.CSSProperties["color"];
      textTransform?: React.CSSProperties["textTransform"];
    };
    learnButton?: {
      borderColor?: React.CSSProperties["color"];
      color?: React.CSSProperties["color"];
      borderWidth?: React.CSSProperties["borderWidth"];
      textTransform?: React.CSSProperties["textTransform"];
      borderRadius?: React.CSSProperties["borderRadius"];
      fontFamily?: React.CSSProperties["fontFamily"];
      fontWeight?: React.CSSProperties["fontWeight"];
    };
  }
}

/*
EXAMPLE from  material-ui.com/guides/typescript/

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: Breakpoint
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: Breakpoint
    }
  }
}

*/
