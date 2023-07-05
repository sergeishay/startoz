import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../models/user';
// import UserRef from "@/models/userSchemaRef";
// import Account from "@/models/acount";
import { connectToDB } from "../../../../utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const handler = NextAuth({
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your name",
        },
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter email and password");
        }

        //check if user exists
        await connectToDB();
        const userExists = await User.findOne({ email: credentials.email });
        //if no user exists, throw error
        if (!userExists || !userExists?.password) {
          throw new Error("No user found");
        }

        //check if password matches
        const passwordMatches = await bcrypt.compare(
          credentials.password,
          userExists.password
        );
        //if password does not match, throw error
        if (!passwordMatches) {
          throw new Error("Password is incorrect");
        }
        return userExists;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.isFirstVisit = sessionUser.isFirstVisit;
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        // console.log({ account, profile, user, credentials });

        if (account.provider === "facebook") {
          // console.log(account.provider + " facebook provid to");
          const userExists = await User.findOne({ email: profile.email });
          if(userExists){

          }
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: user.image,
              isFirstVisit:true
            });
          }
        } else if (account.provider === "google") {
          const userExists = await User.findOne({ email: profile.email });
          // console.log(userExists + " google provid to");
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
