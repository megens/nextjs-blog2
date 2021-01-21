import React, { useState, useEffect, MouseEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";

import Link from "next/link";
import Router from "next/router";
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
      marginBottom: "3em",
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

export default function Header() {
  // RfM: what's the appropriate type for these props? currently using "any", which I don't like
  const classes = useStyles();
  const theme = useTheme(); // gives access to default theme in our component
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState<number>(0);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      /*
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (event) => handleClick(event),
      */
    },
    { name: "Approach", link: "/approach", activeIndex: 2 },
    { name: "Tools", link: "/tools", activeIndex: 3 },
    { name: "Client Login", link: "/login", activeIndex: 4 },
    // leaving out Estimate route
  ];
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newTabValue: number
  ): void => {
    Router.push(routes[newTabValue].link);
    setTabValue(newTabValue);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const tabs = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary" // change color of underline to primary (typed as primary|secondary|undefined)
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            label={route.name}
            /*
                  aria-owns={route.ariaOwns} // if undefined (for NOT services), does not set property at all
                  aria-haspopup={route.ariaPopup}
                  onMouseOver={route.mouseOver}
                  */
          />
        ))}
      </Tabs>
    </React.Fragment>
  );
  // the following componentDidMount type hook makes sure that active Tab will always be highlighted even if page refreshes
  //(instead of default Home highlight)
  useEffect(() => {
    if (window.location.pathname === "/" && tabValue !== 0) {
      setTabValue(0);
    } else if (window.location.pathname === "/services" && tabValue !== 1) {
      setTabValue(1);
    } else if (window.location.pathname === "/approach" && tabValue !== 2) {
      setTabValue(2);
    } else if (window.location.pathname === "/tools" && tabValue !== 3) {
      setTabValue(3);
    } else if (window.location.pathname === "/login" && tabValue !== 4) {
      setTabValue(4);
    }
  }, ["tabValue"]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appBar} position="fixed" color="primary">
          <Toolbar disableGutters={true}>
            {
              // Toolbar allows for horizontal layout of components
            }

            <Button
              disableRipple // don't like this on a logo
              className={classes.logoContainer}
              onClick={() => {
                Router.push(routes[0].link);
                setTabValue(0);
              }}
            >
              <img
                alt="Ockham"
                className={classes.logo}
                src="/images/ockhamLogo.png"
              />
            </Button>

            <Typography className={classes.signage} variant="h3">
              Ockham Actuarial
            </Typography>
            {tabs}
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
