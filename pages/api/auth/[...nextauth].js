import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// https://blog.logrocket.com/using-authentication-in-next-js/

const options = {
  //site: process.env.NEXTAUTH_URL,
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: "smtp.gmail.com", //"smtp.gmail.com" //process.env.VERIFIER_SMTP_SERVER
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn(message) {
      /* on successful sign in */
      console.log(message);
    },
    async signOut(message) {
      /* on signout */
      console.log(message);
    },
    async createUser(message) {
      /* user created */
      console.log(message);
    },
    async linkAccount(message) {
      /* account linked to a user */
      console.log(message);
    },
    async session(message) {
      /* session is active */
      console.log(message);
    },
    async error(message) {
      console.log(message);
    },
  },
};
// In production, for example, this should be replaced with the base URL of your website.

export default (req, res) => NextAuth(req, res, options);
