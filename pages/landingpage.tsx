import React from "react";
import Link from "next/link";
//import { Link } from "react-router-dom";
//import Lottie from "react-lottie"
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";
//import theme from "../components/ui/Theme";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Layout from "../components/layout";
import ButtonArrow from "../components/ui/ButtonArrow";
import CallToAction from "../components/ui/DeepCall";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: "5em",
      [theme.breakpoints.down("md")]: { marginTop: "3em" },
      [theme.breakpoints.down("xs")]: { marginTop: "2em" },
    },
    contactButton: {
      ...theme.typography.contact,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 50,
      height: 45,
      width: 145,
      marginRight: 40,
      "&:hover": { backgroundColor: theme.palette.secondary.light }, // there is a light and dark prop for every color?
    },
    buttonContainer: {
      marginTop: "1em",
    },
    learnButtonHero: {
      ...theme.typography.learnButton,
      fontSize: "0.9rem",
      height: 45,
      width: 145,
    },
    learnButton: {
      ...theme.typography.learnButton,
      fontSize: "0.7rem",
      height: 35,
      padding: 5,
      [theme.breakpoints.down("sm")]: { marginBottom: "2em" },
    },
    heroTextContainer: {
      //minWidth: "21.5em",
      marginLeft: "1em",
      [theme.breakpoints.down("xs")]: { marginLeft: 0 },
    },
    pictureWrap: {
      height: "40em",
      maxWidth: "50em",
      //minWidth: "21em",
      marginTop: "1em",
      marginLeft: "1em",
      marginRight: "1em",
      align: "center",
      // a lignContent: "center",
      [theme.breakpoints.down("sm")]: { maxWidth: "30em" },
    },
    picture: {
      height: "auto",
      width: "auto",
      //maxHeight: "15em",
      borderRadius: "15px",
    },
    specialText: {
      fontFamily: "Pacifico",
      color: theme.palette.secondary.main,
    },
    subtitle: {
      marginBottom: "1em",
    },
    rowContainer: {
      marginTop: "2em",
      marginBottom: "1em",
      width: "100%",
      [theme.breakpoints.down("sm")]: { padding: 25 },
    },
    revolutionBackground: {
      //backgroundImage: `url(${revolutionBackground})`,
      /*
        backgroundImage: (
          <img
            alt="company logo"
            className={classes.logo}
            src="/assets/futureproofBlue.jpg"
          />
        ),
        */
      backgroundImage: `url(${"/assets/iceberg_b&w.jpg"})`,
      backgroundPosition: "center",
      backgroundSize: "cover", // will stretch and fit to cover the whole container
      backgroundRepeat: "no-repeat",
      height: "100%", // take all the space it can
      width: "100%",
    },
    revolutionCard: {
      position: "absolute",
      boxShadow: theme.shadows[10], // shadows in array from light to dark
      borderRadius: 15,
      padding: "10em",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "8em",
        paddingBottom: "8em",
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
      },
    },
    infoBackground: {
      //backgroundImage: `url(${infoBackground})`,
      backgroundPosition: "center",
      backgroundSize: "cover", // will stretch and fit to cover the whole container
      backgroundRepeat: "no-repeat",
      height: "100%", // take all the space it can
      width: "100%",
    },
    simpleBar: {
      backgroundColor: theme.palette.primary.main,
      height: "2em",
    },
    gridWide: {
      width: "auto",
    },
    gridAlignCenter: {
      align: "center",
    },
  })
);

export default function LandingPage() {
  const classes = useStyles();

  const theme = useTheme(); // gives access to default theme in our component

  console.log("Breakpoints FROM LANDING PAGE");
  console.log(theme.breakpoints);

  console.log("and AFTER...");
  console.log(theme.breakpoints);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <React.Fragment>
      <Layout home>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="space-around"
          className={classes.mainContainer}
        >
          <Grid
            container
            direction={matchesSM ? "column-reverse" : "row"} // was matchesSM
            justify={matchesSM ? "flex-end" : "space-evenly"}
            alignItems={matchesSM ? "center" : undefined}
            className={classes.rowContainer}
            style={{ height: matchesXS ? "60em" : matchesSM ? "40em" : "15em" }}
          >
            <Grid item sm>
              <Grid container direction="column">
                <Grid item className={classes.heroTextContainer}>
                  <Typography variant="h2" align="center">
                    Make Better Decisions
                    <br />
                    With Deeper Analytics
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    className={classes.buttonContainer}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        //component={Link}
                        //to="/contact"
                        className={classes.contactButton}
                        onClick={() => {}}
                      >
                        Contact
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        className={classes.learnButtonHero}
                        //component={Link}
                        //to="/revolution"
                        onClick={() => {}}
                      >
                        <span style={{ marginRight: 10 }}>Learn More</span>
                        <ButtonArrow
                          height={15}
                          width={15}
                          fill={theme.palette.primary.main}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm>
              <Grid container direction="column" alignItems="center">
                <Grid item sm className={classes.pictureWrap}>
                  <img
                    alt="logo img"
                    src="/images/iceberg-top-bw.jpg"
                    className={classes.picture}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {
            //-----NEXT Horizontal Block-----
          }

          <Grid
            container
            direction={matchesSM ? "column-reverse" : "row"} // was matchesSM
            justify={matchesSM ? "flex-end" : "space-evenly"}
            alignItems={matchesSM ? "center" : undefined}
            className={classes.rowContainer}
            style={{ height: matchesSM ? "75em" : "40em" }}
          >
            <Grid item sm>
              <Grid container direction="column">
                <Grid item className={classes.heroTextContainer}>
                  <Typography variant="h4" align="center">
                    Custom Software Development
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className={classes.subtitle}
                  >
                    Save Energy. Save Time. Save Money.
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    Complete digital solutions, from investigation to{" "}
                    <span className={classes.specialText}>celebration</span>
                  </Typography>
                  <br />
                  <Typography variant="h4" align="center">
                    iOS/Android App Development
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className={classes.subtitle}
                  >
                    <p>
                      Extend Functionality. Extend Access. Extend Engagement.
                    </p>
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    Integrate your web experience or create a standalone app{" "}
                    {matchesSM ? null : <br />}with either mobile platform.
                  </Typography>{" "}
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    className={classes.buttonContainer}
                  >
                    <Grid item>
                      <Button
                        variant="outlined"
                        className={classes.learnButton}
                        //component={Link}
                        //to="/revolution"
                        onClick={() => {}}
                      >
                        <span style={{ marginRight: 10 }}>Learn More</span>
                        <ButtonArrow
                          height={10}
                          width={10}
                          fill={theme.palette.primary.main}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm>
              <Grid container direction="column" alignItems="center">
                <Grid item sm className={classes.pictureWrap}>
                  <img
                    alt="logo img"
                    src="/images/iceberg-bottom-bw.jpg"
                    className={classes.picture}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.simpleBar}></div>
        {
          //-----Call To Action Block-----
          //
        }
        <CallToAction />
      </Layout>
    </React.Fragment>
  );
}
