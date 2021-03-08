const mongoose = require("mongoose");

const { MONGODB_URI, MONGODB_DB } = process.env;

const connectDB = (handler) => async () => {
  if (mongoose.connections[0].readyState) {
    // use current DB connection
    console.log("readyState exists");
    return handler();
  }
  // use new DB connection
  console.log("create new mongoose connection");
  await mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return handler();
};

export default connectDB;
