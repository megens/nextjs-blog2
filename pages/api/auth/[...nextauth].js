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
  //https://next-auth.js.org/configuration/events
  events: {
    async signIn(message) {
      /* on successful sign in */
    },
    async signOut(message) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async linkAccount(message) {
      /* account linked to a user */
    },
    async session(message) {
      /* session is active */
    },
    async error(message) {
      /* error in authentication flow */
    },
  },
};
// In production, for example, this should be replaced with the base URL of your website.

export default (req, res) => NextAuth(req, res, options);
