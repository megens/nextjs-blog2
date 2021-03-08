import Layout from "../components/layout";
const mongoose = require("mongoose");
import User from "../models/UserModel";

export default function NewUser({ name }) {
  return (
    <Layout>
      <h1>New User created</h1>
      <h3>This user is ...</h3>
      {name}
    </Layout>
  );
}

export async function getServerSideProps() {
  const { MONGODB_URI, MONGODB_DB } = process.env;

  const db = await mongoose.connect(MONGODB_URI);
  console.log("type is", typeof db);

  const user = new User({
    name: "robert",
    email: "r.megens@gmail.com",
    password: "pretendPassword",
  });

  const res = await user.save();
  console.log("res is ", res);
  return {
    props: JSON.parse(JSON.stringify(res)),
  };
}
