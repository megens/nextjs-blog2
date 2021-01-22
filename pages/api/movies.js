// https://developer.mongodb.com/how-to/nextjs-with-mongodb

/*
Example 1: Next.js API Endpoint with MongoDB
The first example we'll look at is building and exposing an API endpoint in our Next.js application. 
To create a new API endpoint route we will first need to create an api directory in our pages directory, 
and then every file we create in this api directory will be treated as an individual API endpoint.

Let's go ahead and create the api directory and a new file in this directory called movies.js. 
This endpoint will return a list of 20 movies from our MongoDB database. 
The implementation for this route is as follows:
*/
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(movies);
};
