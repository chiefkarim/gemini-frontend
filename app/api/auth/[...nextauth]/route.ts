import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const OAUTH_CLIEN_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_SECRET = process.env.OAUTH_SECRET;
const NextAuth_SECRET = process.env.NEXTAUTH_SECRET;
if (!OAUTH_CLIEN_ID) throw new Error("please provide OAUTH_CLIENT_ID env");
if (!OAUTH_SECRET) throw new Error("please provide OAUTH_SECRET env");
if (!NextAuth_SECRET) throw new Error("please provide NEXTAUTH_SECRET env");

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: OAUTH_CLIEN_ID,
      clientSecret: OAUTH_SECRET,
    }),
  ],
  secret: NextAuth_SECRET,
});

export { handler as GET, handler as POST };
