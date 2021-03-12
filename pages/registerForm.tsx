import Layout from "../components/layout";

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import fetch from "isomorphic-unfetch";

import { useTheme, Theme } from "@material-ui/core/styles";

import {
  Formik,
  Form,
  Field,
  useField,
  FormikProps,
  FormikHelpers,
} from "formik";
import { RegisterFormTypes } from "../types/customTypes";

import Router from "next/router";
//import cookie from "js-cookie";

import { object, string, number, boolean, ref } from "yup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.ockh.am">
        Ockham Actuarial
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

const initialValues: RegisterFormTypes = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export default function Login() {
  const classes = useStyles();

  // handleSubmit must be a promise in order to use isSubmitting
  function handleSubmit(
    values: RegisterFormTypes,
    formikHelpers: FormikHelpers<RegisterFormTypes>
  ): any {
    console.log("------");
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          console.log(data.message); // TO DO ... address this error!
        }
        if (data && data.token) {
          //set cookie
          console.log("setting a cookie");
          //cookie.set("token", data.token, { sameSite: "strict" });
          Router.push("/my-profile/dashboard");
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ height: "50px" }}></div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          validationSchema={object({
            username: string().required().min(2).max(100),
            email: string().email().required().min(2).max(100),
            password: string().required().min(2).max(100),
            passwordConfirmation: string().oneOf(
              [ref("password"), null],
              "Passwords must match"
            ),
          })}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="name"
                autoFocus
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new password"
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                autoComplete="match password"
              />
              <Field
                as={FormControlLabel}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                //disabled={isSubmitting} // this requires the submit to be a promise...
              >
                Register
              </Button>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <div style={{ height: "50px" }}></div>
    </Container>
  );
}
