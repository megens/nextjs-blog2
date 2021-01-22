/*
https://github.com/vercel/next.js/pull/19383

This specifies type of global in the mongodb.js file

*/

import { Db, MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    type MongoConnection = {
      client: MongoClient;
      db: Db;
    };

    interface Global {
      mongo: {
        conn: MongoConnection | null;
        promise: Promise<MongoConnection> | null;
      };
    }
  }
}
