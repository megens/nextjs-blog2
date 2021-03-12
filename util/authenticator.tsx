import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify, Secret } from "jsonwebtoken";

const jwtSecret: Secret = process.env.JWTSECRET as Secret;

const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // check that the JWT token is provided
  // check that the signatures match, not expired, etc.
  //
  // execute the request or return error (status: 401)

  const token: string = req.cookies.auth;

  console.log("verify result");
  console.log(token);
  //console.log(verify(token, jwtSecret));

  verify(token, jwtSecret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: "Sorry, you are not authorized" });
  });
  /*
  verify(token, jwtSecret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json("Sorry, you are not authorized");
  });
  */
};

export default authenticated;
