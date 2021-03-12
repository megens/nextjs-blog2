// https://dev.to/raphaelchaula/adding-mongodb-mongoose-to-next-js-apis-3af
// helpful for TS typing is ...
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt, { Secret } from "jsonwebtoken";

const jwtSecret: Secret = process.env.JWTSECRET as Secret;

const complexityOptions = {
  min: 3, // TO DO Change for production
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  //symbol: 1,
  requirementCount: 2, // number of these requirements which must be met
};

const UserSchema = new mongoose.Schema<UserType, mongoose.Model<UserType>>({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, maxlength: 1024 },
  /*date: {
    type: Date,
    default: Date.now,
  },
  */
});

export interface UserType extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

UserSchema.methods.generateAuthToken = function (this: UserType) {
  const token = jwt.sign({ _id: this._id, email: this.email }, jwtSecret, {
    expiresIn: "1h",
  });

  return token;
};

function validate(user: UserType) {
  console.log("validating user ...");
  const joiSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity(complexityOptions), // pre-hash
  });
  console.log("and ...");
  return joiSchema.validate(user);
}

const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema, "users"); // collection name is third parameter

export { User, validate };
