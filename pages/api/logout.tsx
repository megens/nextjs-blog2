// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255

import { User } from "../../models/UserModel";
import dbConnect from "../../util/mongooseConnect";
import mongoose from "mongoose";
import _ from "lodash";
import Joi from "joi";
import { compare } from "bcryptjs";

import { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

import { MongoClient } from "mongodb";
import assert from "assert";

import { v4 } from "uuid";

// TO DO ... type this req.body better!

import { connectToDatabase } from "../../util/mongodb";

function validate(reqBody: NextApiRequest) {
  console.log("validating sign in attempt ...");
  const joiSchema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(), // pre-hash
  });
  return joiSchema.validate(reqBody);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("about to logout");

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", "null", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: -1,
    })
  );
  res.send({ message: "logged out" });
  return;
};

/*
function validate(req) {
  console.log("validating sign in attempt ...");
  const joiSchema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(), // pre-hash
  });
  return joiSchema.validate(req);
}

export default async (req, res) => {
  console.log("about to dbConnect");
  await dbConnect();
  console.log("readyState");
  console.log(mongoose.connection.readyState);
  if (req.method === "POST") {
    // login
    console.log("POST request");

    const { error } = validate(req.body); // Joi validation

    if (error) {
      console.log("error: ");
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }

    //assert.notStrictEqual(null, req.body.email, "Email required");
    //assert.notStrictEqual(null, req.body.password, "Password required");

    //res.status(403).json({ error: true, message: bodyError.message });

    // verify email does not exist already
    console.log("email is ...");
    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });

    // put in db connection error handling here, like other version... TO DO
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); // plain text password to bcrypt
    console.log("validPassword is ");
    console.log(validPassword);
    if (validPassword === false)
      // was !validPassword, but this is a bit riskier
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    console.log("sending token");
    res.status(200).json({ token });
    console.log("status: 200");
    return;
  }
};

*/
