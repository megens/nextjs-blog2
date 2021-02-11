import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { useRouter } from "next/router";

/*
import footerAdornment from "../../assets/Footer Adornment.svg";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      width: "100%",
      zIndex: 1302,
      position: "relative",
    },
    adornment: {
      width: "25em",
      verticalAlign: "bottom", // removes tiny gap at bottom
      [theme.breakpoints.down("md")]: { width: "21em" },
      [theme.breakpoints.down("sm")]: { width: "15em" },
    },
    mainContainer: {
      position: "absolute",
      zIndex: theme.zIndex.modal + 1,
    },
    link: {
      color: "white",
      fontFamily: "Arial",
      fontSize: "0.75rem",
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": { textDecoration: "none" },
    },
    gridItem: {
      margin: "3em",
    },
    icon: {
      height: "4em",
      width: "4em",
      [theme.breakpoints.down("xs")]: { height: "2.5em", width: "2.5em" },
    },
    socialContainer: {
      position: "absolute",
      marginTop: "-6em",
      right: "1.5em", // 1.5em
      [theme.breakpoints.down("xs")]: { right: "0.6em" },
    },
  })
);

export default function Footer(props: any) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Hidden smDown>
        <Grid
          container
          direction="row"
          justify="center"
          className={classes.mainContainer}
        >
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={classes.link}>
                <Link href="/">
                  <a className={classes.link}>Home</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={classes.link}>
                <Link href="/services">
                  <a className={classes.link}>Services</a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/pricing">
                  <a className={classes.link}>Pricing Models</a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/reserving">
                  <a className={classes.link}>Reserving</a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/reinsurance">
                  <a className={classes.link}>Reinsurance</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={classes.link}>
                <Link href="/tools">
                  <a className={classes.link}>Tools</a>
                </Link>
              </Grid>
              <Grid item className={classes.link}>
                <Link href="/iceberg">
                  <a className={classes.link}>Iceberg</a>
                </Link>
              </Grid>
              <Grid item className={classes.link}>
                <Link href="/flightrisk">
                  <a className={classes.link}>FlightRisk</a>
                </Link>
              </Grid>
              <Grid item className={classes.link}>
                <Link href="/databarrier">
                  <a className={classes.link}>Data Barrier</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={classes.link}>
                <Link href="/about">
                  <a className={classes.link}>About Us</a>
                </Link>
              </Grid>
              <Grid item className={classes.link}>
                <Link href="/team">
                  <a className={classes.link}>Team</a>
                </Link>
              </Grid>
              <Grid item className={classes.link}>
                <Link href="/futureproof">
                  <a className={classes.link}>{"<futureProof/>"}</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={classes.link}>
                <Link href="/contact">
                  <a className={classes.link}>Contact</a>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <img
        alt="black decorative slash"
        //src={footerAdornment}
        src="/images/Footer Adornment.svg"
        className={classes.adornment}
      />
      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="facebook logo"
            //src={facebook}
            src="/images/facebook.svg"
            className={classes.icon}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="twitter logo"
            //src={twitter}
            src="/images/twitter.svg"
            className={classes.icon}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="instagram logo"
            //src={instagram}
            src="/images/instagram.svg"
            className={classes.icon}
          />
        </Grid>
      </Grid>
    </footer>
  );
}
