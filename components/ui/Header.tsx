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
    logo: {
      backgroundColor: "primary",
      Color: "white",
      height: "5.5em",
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
      color: "primary",
      marginLeft: "auto", // fills space on Left margin, effectively
    },
    tab: {
      minWidth: 10, // reduce space between tabs
      marginLeft: "25px",
    },
  })
);

export default function Header(props: any) {
  const classes = useStyles();
  const theme = useTheme(); // gives access to default theme in our component
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ): void => {
    props.setValue(newValue);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.logo} position="fixed" color="primary">
          <Toolbar disableGutters={true}>
            {
              // Toolbar allows for horizontal layout of components
            }

            <img
              src="/images/ockhamLogo.png"
              alt="Ockham"
              width="90"
              height="90"
            />
            <Typography className={classes.signage} variant="h3">
              Ockham Actuarial
            </Typography>
            <Tabs className={classes.tabContainer}>
              <Tab className={classes.tab} label="Home" />
              <Tab className={classes.tab} label="Services" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
