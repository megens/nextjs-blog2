const mongoose = require("mongoose");
import Layout from "../components/layout";
import User from "../models/UserModel";
// import connectDB from "../util/mongooseConnect";
import dbConnect from "../util/mongooseConnect";

export default function NewUser({ name }) {
  return (
    <Layout>
      <h1>New User created</h1>
      <h3>This user is ...</h3>
      {name}
    </Layout>
  );
}

const handler = async () => {
  const name = "colleen"; // req.body
  const email = "colleengono@gmail.com";
  const password = "pretendPassword";
  if (name && email && password) {
    try {
      const user = new User({
        name,
        email,
        password, // passwordHash!!!!
      });
      const userCreated = await user.save();
      console.log("userCreated is ", userCreated);

      return userCreated; //res.status(200).send(usercreated);
    } catch (error) {
      console.log("ERROR 2");
      return { error: error.message }; //api return res.status(500).send(error.message);
    }
  } else {
    console.log("ERROR 2");
    //return { error: "data_incomplete" }; //api res.status(422).send("data_incomplete");
  }
};

export async function getServerSideProps() {
  /*
  const { MONGODB_URI, MONGODB_DB } = process.env;

  await mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
*/

  await dbConnect();

  const res = await handler();

  console.log("result is ", res);
  return {
    props: JSON.parse(JSON.stringify(res)),
  };
}
