/*
Example 2: Next.js Pages with MongoDB
In the last section, we saw how we can create an API endpoint and connect to MongoDB with it. 
In this section, we'll get our data directly into our Next.js pages. 
We'll do this using the getServerSideProps() method that is available to Next.js pages.

The getServerSideProps() method forces a Next.js page to load with server-side rendering. 
What this means is that every time this page is loaded, the getServerSideProps() method runs on the backend, 
gets data, and sends it into the React component via props. 
The code within getServerSideProps() is never sent to the client. 
This makes it a great place to implement our MongoDB queries.

This is great. We can directly query our MongoDB database and get all the data we need for a particular page. 
The contents of the getServerSideProps() method are never sent to the client, but 
the one downside to this is that this method runs every time we call the page. 
Our data is pretty static and unlikely to change all that often. 
What if we pre-rendered this page and didn't have to call MongoDB on every refresh? We'll take a look at that next!
*/

import { connectToDatabase } from "../util/mongodb";

export default function Movies({ movies }) {
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
