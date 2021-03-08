// https://dev.to/raphaelchaula/adding-mongodb-mongoose-to-next-js-apis-3af

import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWTSECRET;

const complexityOptions = {
  min: 3, // TO DO Change for production
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  //symbol: 1,
  requirementCount: 2, // number of these requirements which must be met
};




const UserSchema = new mongoose.Schema({
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

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, jwtSecret);
  return token;
};

function validate(user) {
  console.log("validating user ...");
  const joiSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: passwordComplexity(complexityOptions), // pre-hash
  });
  console.log("and ...");
  return joiSchema.validate(user);
}

mongoose.models = {};
// this solves the error of "cannot overwrite model" ... is this more or less elegant than below? TO DO

const User = mongoose.model("User", UserSchema, "users"); // collection name is third parameter

export { User, validate };

// replaces this
// https://stackoverflow.com/questions/62440264/mongoose-nextjs-model-is-not-defined-cannot-overwrite-model-once-compiled
/*
UserSchema.pre("save", async function () {
  try {
    const User = this.constructor;
    const userExists = await User.find({
      userName: this.get("name"),
    })
      .lean() // for speed, skip hydration
      .exec();
    if (userExists.length > 0) {
      throw new Error("User exists. User model already created"); //errorHandler.errors.REGISTER_USERNAME_EXISTS
    }
  } catch (err) {
    throw new Error("User exists. User model already created"); //errorHandler.errors.REGISTER_USERNAME_EXISTS
  }
});
//const User = mongoose.model("User", UserSchema);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
*/
