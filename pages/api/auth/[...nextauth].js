import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextRequest } from "next/server";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

// async function refreshAccessToken(token) {
//   try {
//     // spotifyApi.setAccessToken(token.accessToken);
//     // spotifyApi.setRefreshToken(token.refreshToken);
//     // const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
//     // console.log(`Refreshed TOKEN: ${refreshedToken}`);
//     // return {
//     //   ...token,
//     //   accessToken: refreshedToken.access_token,
//     //   accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
//     //   refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
//     // };
//   } catch (error) {
//     console.error(error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        console.log("TOKEN IS STILL VALID.");
        return token;
      }
      console.log("WOLOLO! ACCESS TOKEN EXPIRED!!");
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
};

export default NextAuth(authOptions);
