// pages/api/data.js

// Any file that exports a default async function and is created in the page/api folder will automatically be an API route.
// In this case, this file will be mapped to http://localhost:3000/api/data.

import { getSession, Session } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session | null = await getSession({ req });

  if (session) {
    res.status(200).json({
      message: "You can access this content because you are signed in.",
    });
  } else {
    res.status(403).json({
      message:
        "You must be sign in to view the protected content on this page.",
    });
  }
};
