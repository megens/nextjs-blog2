import React from "react";
import Link from "next/link";
//import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useTheme, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import ButtonArrow from "./ButtonArrow";

//import background from "../../assets/iceberg_b&w.jpg";
//import mobileBackground from "../../assets/iceberg_b&w.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    learnButton: {
      ...theme.typography.learnButton,
      fontSize: "0.7rem",
      height: 35,
      padding: 5,
      [theme.breakpoints.down("sm")]: { marginBottom: "2em" },
    },
    background: {
      //backgroundImage: `url(${background})`,
      backgroundImage: 'url("/images/iceberg_b&w.jpg")',
      backgroundPosition: "center",
      backgroundSize: "cover", // will stretch and fit to cover the whole container
      backgroundRepeat: "no-repeat",
      //backgroundAttachment: "fixed", // this fixes the picture in place while website "moves" around it
      height: "160em", // take all the space it can THIS IS ODD
      width: "100%",
      [theme.breakpoints.down("md")]: {
        //backgroundAttachment: "inherit",
        //backgroundImage: `url(${mobileBackground})`,
        backgroundImage: 'url("/images/iceberg_b&w.jpg")',
      },
    },
    contactButton: {
      ...theme.typography.contact,
      borderRadius: 50,
      height: 80,
      width: 205,
      backgroundColor: theme.palette.secondary.main,
      fontSize: "1.5rem",
      marginRight: "5em",
      marginLeft: "2em",
      "&:hover": { backgroundColor: theme.palette.secondary.light },
      [theme.breakpoints.down("sm")]: { marginLeft: 0, marginRight: 0 },
    },
  })
);

export default function CallToAction() {
  const theme = useTheme();
  const classes = useStyles();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  //const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      container
      direction={matchesSM ? "column" : "row"}
      alignItems="center"
      justify={matchesSM ? "center" : "space-between"}
      className={classes.background}
    >
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : "5em",
          textAlign: matchesSM ? "center" : "inherit",
        }}
      >
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h2">
              Simple software. <br />
              Revolutionary results.
            </Typography>
            <Typography variant="subtitle2" style={{ fontSize: "1.5rem" }}>
              Take advantage of the 21st Century.
            </Typography>

            <Grid item container justify={matchesSM ? "center" : undefined}>
              <Button
                variant="outlined"
                //component={Link}
                //to="/revolution"
                className={classes.learnButton}
                onClick={() => {
                  //
                  //
                }}
              >
                <span style={{ marginRight: 5 }}>Learn More</span>
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
      <Grid item>
        <Button
          variant="contained"
          // component={Link}
          // to="/contact"
          className={classes.contactButton}
          onClick={() => {
            //
            //
          }}
        >
          Contact
        </Button>
      </Grid>
    </Grid>
  );
}
