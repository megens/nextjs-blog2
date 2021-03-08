import Layout from "../components/layout";
const mongoose = require("mongoose");
import User from "../models/UserModel";

export default function NewUser({ users }) {
  return (
    <Layout>
      <h1>Found User</h1>
      <h3>The first user is ...</h3>
      {users[0].name}
      <br />
      {users[0].email}
    </Layout>
  );
}

export async function getServerSideProps() {
  const { MONGODB_URI, MONGODB_DB } = process.env;

  const db = await mongoose.connect(MONGODB_URI);

  // comparison operators: eq, ne, gt, gte, lt, lte, in, nin
  // logical operators: or, and
  // regex

  const users = await User.find({ name: "robert" })
    //.find({ price: { $gte: 5, $lte: 20 } })
    //.find({ price: { $in: [10, 20, 30] } })

    // LOGICAL operator
    /*
    .find()
    .or([{author:'Mosh'}, {isPublished:true}])
    */
    // REGEX
    /*
    .find({author: /.*Mosh.*$/i})
    */
    .limit(10)
    //.
    .sort({ name: 1 })
    //.count() // count documents that match
    .select({ name: 1, email: 1 });

  console.log(users);

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}
