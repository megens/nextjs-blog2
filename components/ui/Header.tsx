import React, { useState, useEffect, MouseEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// unstaged change

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

/*
const useStyles = makeStyles(theme => ({
  toolbarMargin: { ...theme.mixins.toolbar },
}));
*/

// to defeat TS type widening system, use createStyles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {},
    logoContainer: {
      padding: "20px",
      "&:hover": {
        backgroundColor: "transparent",
      }, // avoids slight shade on hover
    },
    logo: {
      backgroundColor: "primary",
      color: "white",
      height: "9em",
      borderRadius: "10%",
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
      //backgroundColor: "black",
      marginBottom: "1em",
    },
    signage: {
      color: "white",
      //color: theme.palette.common.black,
      //color: theme.palette.secondary.dark,
      padding: "10px 30px",
    },
    tabContainer: {
      //color: "primary",
      marginLeft: "auto", // fills space on Left margin, effectively
    },
    tab: {
      ...theme.typography.tab,
      minWidth: 10, // reduce space between tabs
      marginLeft: "25px",
    },
    contact: {
      ...theme.typography.contact,
      borderRadius: "50px",
      marginLeft: "50px",
      marginRight: "25px",
      height: "45px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  })
);

export default function Header(props: any) {
  const classes = useStyles();
  const theme = useTheme(); // gives access to default theme in our component
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState<number>(0);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newTabValue: number
  ): void => {
    //props.setTabValue(newTabValue);
    setTabValue(newTabValue);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appBar} position="fixed" color="primary">
          <Toolbar disableGutters={true}>
            {
              // Toolbar allows for horizontal layout of components
            }

            <Button
              disableRipple
              onClick={() => props.setValue(0)}
              className={classes.logoContainer}
            >
              <img
                alt="Ockham"
                className={classes.logo}
                src="/images/ockhamLogo.png"
              />
            </Button>

            {/*
            <img
              src="/images/ockhamLogo.png"
              alt="Ockham"
              width="90"
              height="90"
            />
            */}

            <Typography className={classes.signage} variant="h3">
              Ockham Actuarial
            </Typography>
            <Tabs
              className={classes.tabContainer}
              value={tabValue}
              //onChange={() => {}}
              onChange={handleChange}
              indicatorColor="primary" // change color of underline to primary (typed as primary|secondary|undefined)
            >
              <Tab className={classes.tab} label="Home" />
              <Tab className={classes.tab} label="Services" />
              <Tab className={classes.tab} label="Approach" />
              <Tab className={classes.tab} label="Tools" />
              <Tab className={classes.tab} label="Client Login" />
            </Tabs>
            <Button
              className={classes.contact}
              variant="contained"
              color="secondary"
              onClick={() => {}}
            >
              Contact
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
