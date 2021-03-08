import { NextApiRequest, NextApiResponse } from "next";
import Layout, { siteTitle } from "../../components/layout";
import About from "../about";

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
};
