import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "@/lib/db";
const OAUTH_CLIEN_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_SECRET = process.env.OAUTH_SECRET;
const NextAuth_SECRET = process.env.NEXTAUTH_SECRET;
if (!OAUTH_CLIEN_ID) throw new Error("please provide OAUTH_CLIENT_ID env");
if (!OAUTH_SECRET) throw new Error("please provide OAUTH_SECRET env");
if (!NextAuth_SECRET) throw new Error("please provide NEXTAUTH_SECRET env");

const handler = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: OAUTH_CLIEN_ID,
      clientSecret: OAUTH_SECRET,
    }),
  ],
  secret: NextAuth_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
