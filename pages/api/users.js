// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255

import { validate, User } from "../../models/UserModel";
import dbConnect from "../../util/mongooseConnect";
import mongoose from "mongoose";
import _ from "lodash";
import { hash, genSalt } from "bcryptjs";

import { MongoClient } from "mongodb";
import assert from "assert";

import { v4 } from "uuid";
// import jwt from "jsonwebtoken";

const saltRounds = 10;

export default async (req, res) => {
  await dbConnect();
  console.log("readyState");
  console.log(mongoose.connection.readyState);
  // put in db connection error handling here, like other version... TO DO

  if (req.method === "POST") {
    // signup
    // TO DO: send Auth email to click to verify their email... then signs them in.

    // validate presence, criteria of email, password
    const { error } = validate(req.body); // Joi validation
    if (error) {
      console.log("validation error: ");
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }

    // verify email does not exist already
    console.log("checking db for presence of email ...", req.body.email);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("user exists error.");
      return res.status(400).send("User already registered. Email in use.");
    }
    user = new User(_.pick(req.body, ["name", "email", "password"])); // Mosh: a malicious user might pass us many properties to store in the db, so we select only those from req.body we want
    const salt = await genSalt(saltRounds);
    user.password = await hash(user.password, salt);

    await user.save();
    const token = user.generateAuthToken();

    //res.setHeader("x-auth-token", token, { httpOnly: true });
    //res.send(_.pick(user, ["_id", "name", "email"]));
    res.status(200).json({ token });
    return;

    //res.send(_.pick(user, ["_id", "name", "email"]));

    /*
    client.connect(function (err) {
      assert.strictEqual(null, err);
      console.log("Connected to MongoDB server =>");
      const db = client.db(dbName);
      const email = req.body.email;
      const password = req.body.password;

      findUser(db, email, function (err, user) {
        if (err) {
          console.log("status: 500");
          res.status(500).json({ error: true, message: "Error finding User" });
          return;
        }
        if (!user) {
          // proceed to Create
          createUser(db, email, password, function (creationResult) {
            if (creationResult.ops.length === 1) {
              const user = creationResult.ops[0];
              console.log("user ", user);
              const token = jwt.sign(
                { userId: user.userId, email: user.email },
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                }
              );
              res.status(200).json({ token });
              console.log("status: 200");
              return;
            }
          });
        } else {
          // User exists
          res.status(403).json({ error: true, message: "Email exists" });
          console.log("status: 403");
          return;
        }
      });
    });

    */
  } else {
    console.log("this only accepts POST requests");
    res.status(405).json({ message: "Only support POST requests" });
  }
};
