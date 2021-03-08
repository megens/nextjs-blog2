// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255

import { MongoClient } from "mongodb";
import assert from "assert";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWTSECRET;

const saltRounds = 10;
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

export default (req, res) => {
  if (req.method === "POST") {
    // signup
    try {
      assert.notStrictEqual(null, req.body.email, "Email required");
      assert.notStrictEqual(null, req.body.password, "Password required");
    } catch (bodyError) {
      res.status(403).json({ error: true, message: bodyError.message });
    }

    // verify email does not exist already
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
  }
};
