// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255
import { Secret } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const jwtSecret: Secret = process.env.JWTSECRET as Secret;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (!req.cookies.auth) {
      res.status(401).json({ message: "Unable to auth" });
      return;
    }
    let decoded;
    const token = req.cookies.auth;
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (e) {
        console.error(e);
      }
    }

    if (decoded) {
      res.json(decoded);
      return;
    } else {
      res.status(401).json({ message: "Unable to auth" });
    }
  }
};
