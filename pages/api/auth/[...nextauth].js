import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// https://blog.logrocket.com/using-authentication-in-next-js/

const options = {
  //site: process.env.NEXTAUTH_URL,
  site: process.env.VERCEL_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: process.env.VERIFIER_SMTP_SERVER, //"smtp.gmail.com"
        secure: true,
        auth: {
          user: process.env.VERIFIER_EMAIL_USERNAME,
          pass: process.env.VERIFIER_EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
// In production, for example, this should be replaced with the base URL of your website.

export default (req, res) => NextAuth(req, res, options);
