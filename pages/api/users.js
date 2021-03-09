// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255

import { validate, User } from "../../models/UserModel";
import dbConnect from "../../util/mongooseConnect";
import mongoose from "mongoose";
import _ from "lodash";

import { MongoClient } from "mongodb";
import assert from "assert";
const bcrypt = require("bcryptjs");
import { v4 } from "uuid";
// import jwt from "jsonwebtoken";

const saltRounds = 10;

/*
const jwtSecret = process.env.JWTSECRET;

const url = process.env.MONGODB_URI; // declare this better!! more consistent with rest of app
const dbName = process.env.MONGODB_DB; // same

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, email, callback) {
  const collection = db.collection("user");
  collection.findOne({ email }, callback);
}

function createUser(db, email, password, callback) {
  const collection = db.collection("user");
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    collection.insertOne(
      {
        userId: v4(),
        email,
        password: hash,
      },
      function (err, userCreated) {
        assert.strictEqual(err, null);
        callback(userCreated);
      }
    );
  });
}

*/

export default async (req, res) => {
  await dbConnect();
  console.log("readyState");
  console.log(mongoose.connection.readyState);
  if (req.method === "POST") {
    // signup
    // TO DO: send Auth email to click to verify their email... then signs them in.
    // currently does not sign them in after registering
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
    if (user) {
      console.log("user exists error.");
      return res.status(400).send("User already registered. Email in use.");
    }
    user = new User(_.pick(req.body, ["name", "email", "password"])); // Mosh: a malicious user might pass us many properties to store in the db, so we select only those from req.body we want
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);

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
  }
};
