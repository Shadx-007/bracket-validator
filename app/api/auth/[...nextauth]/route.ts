import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

const authOptions: any = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === "github") {
        await connectToDatabase();

        if (!profile?.email) return false;

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
         await User.create({
  name: profile.name,
  email: profile.email,
  image: profile.image,
} as any);

        }
      }
      return true;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: any) {
  if (session.user) {
    session.user.email = token.email as string;
    session.user.name = token.name as string; // ✅ ADD THIS
  }
  return session;
},

  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
