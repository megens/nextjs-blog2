import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";

import Link from "next/link";
import { useRouter } from "next/router";
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
      // RfM: I added these... are they good?
      opacity: 0.7,
      "&:hover": { opacity: 0.9 },
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
    menu: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover": { opacity: 0.9 },
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const theme = useTheme(); // gives access to default theme in our component
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState<number | false>(false);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorElServices, setAnchorElServices] = useState<HTMLElement | null>(
    null
  );
  const [anchorElTools, setAnchorElTools] = useState<HTMLElement | null>(null);
  const [openMenuServices, setOpenMenuServices] = useState<boolean>(false);
  const [openMenuTools, setOpenMenuTools] = useState<boolean>(false);
  const [selectedIndexServices, setSelectedIndexServices] = useState<number>(0);
  const [selectedIndexTools, setSelectedIndexTools] = useState<number>(0);

  const router = useRouter();

  interface RouteType {
    name: string;
    link: string;
    routeValue: number;
    activeIndex: number;
  }
  const routes: RouteType[] = [
    { name: "Home", link: "/", routeValue: 0, activeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      routeValue: 1,
      activeIndex: 1,
      /*
      ariaOwns: anchorEl ? "service-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (event) => handleClick(event),
      */
    },
    {
      name: "Pricing Models",
      link: "/pricing",
      routeValue: 1.1,
      activeIndex: 1,
    },
    {
      name: "Reserving",
      link: "/reserving",
      routeValue: 1.2,
      activeIndex: 1,
    },
    {
      name: "Reinsurance",
      link: "/reinsurance",
      routeValue: 1.3,
      activeIndex: 1,
    },

    { name: "Tools", link: "/tools", routeValue: 2, activeIndex: 2 },
    {
      name: "Iceberg",
      link: "/iceberg",
      routeValue: 2.1,
      activeIndex: 2,
    },
    {
      name: "FlightRisk",
      link: "/flightrisk",
      routeValue: 2.2,
      activeIndex: 2,
    },
    {
      name: "<futureProof/>",
      link: "/futureproof",
      routeValue: 2.3,
      activeIndex: 2,
    },
    { name: "Client Login", link: "/login", routeValue: 3, activeIndex: 3 },
  ];

  const menuServiceOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Pricing Models",
      link: "/pricing",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "Reserving",
      link: "/reserving",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Reinsurance",
      link: "/reinsurance",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const menuToolOptions = [
    { name: "Tools", link: "/tools", activeIndex: 2, selectedIndex: 0 },
    {
      name: "Iceberg",
      link: "/iceberg",
      activeIndex: 2,
      selectedIndex: 1,
    },
    {
      name: "FlightRisk",
      link: "/flightrisk",
      activeIndex: 2,
      selectedIndex: 2,
    },
    {
      name: "<futureProof/>",
      link: "/futureproof",
      activeIndex: 2,
      selectedIndex: 3,
    },
  ];

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newTabValue: number
  ): void => {
    console.log("newTabValue is" + newTabValue);
    let targetRoute: RouteType | undefined = routes.find((route) => {
      return route.routeValue === newTabValue;
    });
    if (targetRoute === undefined) {
      router.push("/404");
      setTabValue(false);
    } else {
      router.push(targetRoute.link);
      //setTabValue(Math.floor(targetRoute.routeValue));
      setTabValue(false);
    }
    //router.push(routes[newTabValue].link);
  };

  const handleClickServices = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ): void => {
    // was (e: React.ChangeEvent<HTMLInputElement>):
    setAnchorElServices(e.currentTarget);
    setOpenMenuServices(true);
  };

  const handleClickTools = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ): void => {
    // was (e: React.ChangeEvent<HTMLInputElement>):
    setAnchorElTools(e.currentTarget);
    setOpenMenuTools(true);
  };

  const handleMenuItemClickServices = (
    e: React.MouseEvent,
    i: number
  ): void => {
    setAnchorElServices(null); // menu goes away
    setOpenMenuServices(false);
    setSelectedIndexServices(i);
    console.log("set selectedIndex to: " + i);
  };

  const handleMenuItemClickTools = (e: React.MouseEvent, i: number): void => {
    setAnchorElTools(null); // menu goes away
    setOpenMenuTools(false);
    setSelectedIndexTools(i);
    console.log("set selectedIndex to: " + i);
  };

  const handleClose = (): void => {
    setAnchorElServices(null);
    setAnchorElTools(null);
    setOpenMenuServices(false);
    setOpenMenuTools(false);
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

  useEffect(() => {
    let currentLinkIndex: number | undefined = routes.find(
      (route) => route.link === window.location.pathname
    )?.activeIndex;
    if (currentLinkIndex === undefined) {
      setTabValue(false);
    } else {
      if (tabValue !== currentLinkIndex) {
        setTabValue(currentLinkIndex);
      }
    }
  }, ["tabValue"]);

  // the following componentDidMount type hook makes sure that active Tab will always be highlighted even if page refreshes
  //(instead of default Home highlight)
  /*
  useEffect(() => {
    console.log("useEffect tabValue is " + tabValue);
    if (window.location.pathname === "/" && tabValue !== 0) {
      setTabValue(0);
    } else if (
      (window.location.pathname === "/services" ||
        window.location.pathname === "/pricing" ||
        window.location.pathname === "/reserving" ||
        window.location.pathname === "/reinsurance") &&
      tabValue !== 1
    ) {
      setTabValue(1);
    } else if (window.location.pathname === "/approach" && tabValue !== 2) {
      setTabValue(2);
    } else if (window.location.pathname === "/tools" && tabValue !== 3) {
      setTabValue(3);
    } else if (window.location.pathname === "/login" && tabValue !== 4) {
      setTabValue(4);
    }
  }, ["tabValue"]);
  */

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
                router.push(routes[0].link);
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
              f
            </Typography>
            <Typography className={classes.signage} variant="body1">
              tab value = {tabValue} and index value = {selectedIndexServices}
            </Typography>

            <Tabs
              className={classes.tabContainer}
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab className={classes.tab} label="Home" />

              <Tab
                className={classes.tab}
                label="Services"
                aria-owns={anchorElServices ? "service-menu" : undefined} // if undefined (for NOT services), does not set property at all
                aria-haspopup={anchorElServices ? true : undefined}
                onMouseOver={(event) => handleClickServices(event)}
                //  onMouseOver={route.mouseOver}
              />

              <Tab
                className={classes.tab}
                label="Tools"
                aria-owns={anchorElTools ? "tools-menu" : undefined} // if undefined (for NOT services), does not set property at all
                aria-haspopup={anchorElTools ? true : undefined}
                onMouseOver={(event) => handleClickTools(event)}
              />
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

            <Menu
              id="service-menu"
              anchorEl={anchorElServices}
              getContentAnchorEl={null}
              // https://stackoverflow.com/questions/48157863/how-to-make-a-dropdown-menu-open-below-the-appbar-using-material-ui
              open={openMenuServices}
              onClose={handleClose}
              MenuListProps={{
                onMouseLeave: handleClose,
                // to close Menu (openMenu handled by Tab hover, closeMenu by onMouseLeave on Menu list component )
              }}
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuServiceOptions.map((option, i) => (
                <MenuItem
                  key={i}
                  onClick={(e: React.MouseEvent): void => {
                    //router.push(option.link);
                    handleChange(e, 1 + i / 10);
                    handleMenuItemClickServices(e, i);
                    handleClose();
                    setTabValue(1);
                  }}
                  classes={{ root: classes.menuItem }}
                  selected={i === selectedIndexServices}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>

            <Menu
              id="tools-menu"
              anchorEl={anchorElTools}
              getContentAnchorEl={null}
              open={openMenuTools}
              onClose={handleClose}
              MenuListProps={{
                onMouseLeave: handleClose,
                // to close Menu (openMenu handled by Tab hover, closeMenu by onMouseLeave on Menu list component )
              }}
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuToolOptions.map((option, i) => (
                <MenuItem
                  key={i}
                  onClick={(e: React.MouseEvent): void => {
                    //router.push(option.link);
                    handleChange(e, 2 + i / 10);
                    handleMenuItemClickTools(e, i);
                    handleClose();
                    setTabValue(2);
                  }}
                  classes={{ root: classes.menuItem }}
                  selected={i === selectedIndexTools}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
