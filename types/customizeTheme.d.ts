import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

// This is to ADD properties to a theme. Which differs from EXTENDING the Typography to include a <tab> property, for example

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    rfmProperty: {
      tab: {
        fontFamily: React.CSSProperties["fontFamily"];
        //fontWeight: React.CSSProperties["fontWeight"];
        //fontSize: React.CSSProperties["fontSize"];
        //color: React.CSSProperties["color"];
        //textTransform: React.CSSProperties["textTransform"];
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    rfmProperty?: {
      tab?: {
        fontFamily?: React.CSSProperties["fontFamily"];
        //fontWeight?: React.CSSProperties["fontWeight"];
        //fontSize?: React.CSSProperties["fontSize"];
        //color?: React.CSSProperties["color"];
        //textTransform?: React.CSSProperties["textTransform"];
      };
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
