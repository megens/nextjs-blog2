/*
Example 3: Next.js Static Generation with MongoDB
For our final example, we'll take a look at how static page generation can work with MongoDB. 
Let's create a new file in the pages directory and call it top.js. 
For this page, what we'll want to do is render the top 1000 movies from our MongoDB database.

Top 1000 movies? Are you out of your mind? That'll take a while, and the database round trip is not worth it. 
Well what if we only called this method once when we built the application, 
so that even if that call takes a few seconds, it'll only ever happen once and our users won't be affected. 
They'll get the top 1000 movies delivered as quickly or even faster than the 20 using serverSideProps(). 
The magic lies in the getStaticProps() method, and our implementation looks like this:

At a glance this looks very similar to the movies.js file we created earlier. 
The only significant changes we made were changing our limit from 20 to 1000 and our getServerSideProps() method 
to getStaticProps(). 
If we navigate to localhost:3000/top in our browser, we'll see a long list of movies.

Loading this page took about 3.5 seconds on my machine as opposed to sub-1 second response time for the /movies page. 
The reason it takes this long is because in development mode the getStaticProps() method is called every single time 
(just like the getServerSideProps() method). 
But if we switch from development mode to production mode, we'll see the opposite. 
The /top page will be pre-rendered and will load almost immediately, while the /movies and /api/movies routes 
will execute the server-side code each time.
*/

import { connectToDatabase } from "../util/mongodb";

export default function Top({ movies }) {
  return (
    <div>
      <h1>Top 1000 Movies of All Time</h1>
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

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(1001)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
