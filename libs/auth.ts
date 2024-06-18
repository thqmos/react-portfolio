import connectDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
        async authorize(credentials: any) {
          if (!credentials) {
            return null;
          }
  
          const { email, password } = credentials;
  
          try {
            await connectDB();
            const user = await User.findOne({ email });
  
            if (!user) {
              return null;
            }
  
            const passwordsMatch = await bcrypt.compare(password, user.password);
  
            if (!passwordsMatch) {
              return null;
            }
  
            return user;
          } catch (error) {
            console.error("Error: ", error);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
  };