import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";

//import Link from "next/link";
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
    appBar: {
      zIndex: theme.zIndex.modal + 1,
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
      height: "10.5em",
      //marginBottom: "7em",
      [theme.breakpoints.down("md")]: {
        height: "9em", // switched to adjusting height rather than marginBottom because overlap of margins is permitted and was messing up my layout.
        //marginBottom: "0em",
      },
      [theme.breakpoints.down("xs")]: {
        height: "7.5em",
      },
    },
    logoContainer: {
      padding: "20px",
      "&:hover": {
        backgroundColor: "transparent",
      }, // avoids slight shade on hover
    },
    logo: {
      backgroundColor: "primary",
      color: "white",
      borderRadius: "10%",
      height: "9em",
      [theme.breakpoints.down("md")]: {
        height: "7.5em", // was 7.5
      },
      [theme.breakpoints.down("xs")]: {
        height: "5.5em",
      },
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
    drawerIconContainer: {
      marginLeft: "auto",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    drawerIcon: {
      height: "50px",
      width: "50px",
    },
    drawer: {
      backgroundColor: theme.palette.primary.main,
    },
    drawerItem: {
      ...theme.typography.tab,
      color: "white",
      opacity: 0.7,
    },
    drawerItemSelected: {
      "& .MuiListItemText-root": {
        opacity: 1,
      },
    },
    drawerItemSpecial: {
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

export default function Header() {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme(); // gives access to default theme in our component
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md")); //RFM: CHANGE TO md

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

  interface RouteType {
    name: string;
    link: string;
    routeValue: number;
    tabValue: number;
    branchValue?: number;
    ariaOwns?: string | undefined;
    ariaPopup?: boolean | "true" | "false" | undefined;
    mouseOver?: { (event: React.MouseEvent<HTMLElement>): void };
  }
  const routes: RouteType[] = [
    { name: "Home", link: "/", routeValue: 0, tabValue: 0 },
    {
      name: "Services",
      link: "/services",
      routeValue: 1,
      tabValue: 1,
      ariaOwns: anchorElServices ? "service-menu" : undefined,
      ariaPopup: anchorElServices ? "true" : undefined,
      mouseOver: (event: React.MouseEvent<HTMLElement>) =>
        handleHoverServices(event),
    },
    {
      name: "Pricing Models",
      link: "/pricing",
      routeValue: 1.1,
      tabValue: 1,
      branchValue: 1,
    },
    {
      name: "Reserving",
      link: "/reserving",
      routeValue: 1.2,
      tabValue: 1,
      branchValue: 2,
    },
    {
      name: "Reinsurance",
      link: "/reinsurance",
      routeValue: 1.3,
      tabValue: 1,
      branchValue: 3,
    },

    {
      name: "Tools",
      link: "/tools",
      routeValue: 2,
      tabValue: 2,
      ariaOwns: anchorElTools ? "service-menu" : undefined,
      ariaPopup: anchorElTools ? "true" : undefined,
      mouseOver: (event: React.MouseEvent<HTMLElement>) =>
        handleHoverTools(event),
    },
    {
      name: "Iceberg",
      link: "/iceberg",
      routeValue: 2.1,
      tabValue: 2,
      branchValue: 1,
    },
    {
      name: "FlightRisk",
      link: "/flightrisk",
      routeValue: 2.2,
      tabValue: 2,
      branchValue: 2,
    },
    {
      name: "DataBarrier",
      link: "/databarrier",
      routeValue: 2.3,
      tabValue: 2,
      branchValue: 3,
    },
    {
      name: "<futureProof/>",
      link: "/futureproof",
      routeValue: 2.4,
      tabValue: 2,
      branchValue: 4,
    },
    { name: "Client Login", link: "/login", routeValue: 3, tabValue: 3 },
  ];

  const menuServiceOptions = routes.filter((route) => route.tabValue === 1);
  const menuToolOptions = routes.filter((route) => route.tabValue === 2);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newRouteValue: number
  ): void => {
    //console.log("newTabValue is" + newTabValue);
    let targetRoute: RouteType | undefined = routes.find((route) => {
      return route.routeValue === newRouteValue;
    });
    if (targetRoute === undefined) {
      router.push("/404");
      setTabValue(false);
    } else {
      router.push(targetRoute.link);
      //setTabValue(Math.floor(targetRoute.routeValue));
      setTabValue(targetRoute.tabValue);
    }
    //router.push(routes[newTabValue].link);
  };

  const handleHoverServices = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ): void => {
    // was (e: React.ChangeEvent<HTMLInputElement>):
    setAnchorElServices(e.currentTarget);
    setOpenMenuServices(true);
  };

  const handleHoverTools = (
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

  useEffect(() => {
    // the following componentDidMount type hook makes ensures active Tab will always be highlighted even if page refreshes
    //(instead of default Home highlight). Comlicated because NextJS refreshes on every router.push()

    let currentRoute: RouteType | undefined = routes.find(
      (route) => route.link === window.location.pathname
    );
    if (currentRoute === undefined) {
      setTabValue(false);
      setSelectedIndexServices(0);
      setSelectedIndexTools(0);
    } else {
      setTabValue(currentRoute.tabValue);
      if (
        currentRoute.tabValue === 1 &&
        currentRoute.branchValue !== undefined
      ) {
        setSelectedIndexServices(currentRoute.branchValue);
        setSelectedIndexTools(0);
      }
      if (
        currentRoute.tabValue === 2 &&
        currentRoute.branchValue !== undefined
      ) {
        setSelectedIndexServices(0);
        setSelectedIndexTools(currentRoute.branchValue);
      }
    }
  }, ["tabValue", "selectedIndexServices", "selectedIndexTools"]);

  const tabs = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary" // change color of underline to primary (typed as primary|secondary|undefined)
      >
        {routes
          .filter((route) => route.branchValue === undefined)
          .map((route, index) => (
            <Tab
              key={`${route}${index}`}
              className={classes.tab}
              label={route.name}
              aria-owns={route.ariaOwns} // if undefined (for NOT services), does not set property at all
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
            />
          ))}
      </Tabs>
      <Button
        className={classes.contact}
        variant="contained"
        color="secondary"
        onClick={() => {
          router.push("/contact");
          setTabValue(false);
        }}
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
        style={{ zIndex: 1302 }} // 1 above app bar? so it won't cover this
      >
        {menuServiceOptions.map((option, i) => (
          <MenuItem
            key={i}
            onClick={(e: React.MouseEvent): void => {
              handleChange(e, option.routeValue);
              handleMenuItemClickServices(e, i);
              handleClose();
              setTabValue(option.routeValue);
            }}
            classes={{ root: classes.menuItem }}
            selected={i === selectedIndexServices} //selectedIndexServices}
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
        style={{ zIndex: 1302 }} // 1 above app bar? so it won't cover this
      >
        {menuToolOptions.map((option, i) => (
          <MenuItem
            key={i}
            onClick={(e: React.MouseEvent): void => {
              //router.push(option.link);
              handleChange(e, option.routeValue);
              handleMenuItemClickTools(e, i);
              handleClose();
              setTabValue(option.routeValue);
            }}
            classes={{ root: classes.menuItem }}
            selected={i === selectedIndexTools}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes
            .filter((route) => route.branchValue === undefined)
            .map((route, index) => (
              <ListItem
                key={`${route}${index}`}
                divider
                button
                classes={{ selected: classes.drawerItemSelected }}
                selected={tabValue === route.routeValue}
                onClick={(e: React.MouseEvent): void => {
                  setOpenDrawer(false);
                  handleChange(e, route.routeValue);
                  setTabValue(route.routeValue);
                }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              router.push("/contact");
              setTabValue(false);
            }}
            divider
            button
            //component={Link}
            classes={{
              root: classes.drawerItemSpecial,
              selected: classes.drawerItemSelected,
            }}
            //to="/estimate"
            //selected={props.value === 5}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Contact
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appBar} position="fixed" color="primary">
          <Toolbar disableGutters={true}>
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

            <Typography className={classes.signage} variant="h4">
              Ockham Actuarial
            </Typography>
            {/*
            <Typography className={classes.signage} variant="body1">
              tab value = {tabValue} and index value = {selectedIndexServices}{" "}
              and {selectedIndexTools}
            </Typography>
            */}
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}>toolbarMargin</div>
    </React.Fragment>
  );
}
