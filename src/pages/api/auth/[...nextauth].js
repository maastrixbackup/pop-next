import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied

        if (credentials.email) {
          const user = credentials.email;
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        // Set the expiration time for the token (e.g., 7 days from now)
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 7 days
      }
      return token;
    },
  },
});
