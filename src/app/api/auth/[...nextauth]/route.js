import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from "next-auth/providers/kakao";


import axios from "axios";

console.log("⚙️ NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),


    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/TEST/MSPLogin`, {
            user_email: credentials.email,
            user_pw: credentials.password,
            user_name: "BCTONE",
            loginMethod: credentials.loginMethod,
          });

          if (res.status === 200) {
            console.log(res.data);
            return {
              // id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              // message: res.data.message,
              role: res.data.role,
              response: res.data.response,
              status: res.data.status
            };
          }
          return null;
        } catch (error) {
          console.error("에러 발생:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },


  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/googlelogin`, {
            email: user.email,
            name: user.name,
            image: user.image,
          });
          if (res.status === 200) {
            user.id = res.data.id;
            user.message = res.data.message;
            user.role = res.data.role;
          }
        } catch (error) {
          console.error("Google 로그인 후 백엔드 전송 실패:", error);
          return false; // 로그인 중단
        }
      }

      if (account.provider === "kakao") {
        console.log(JSON.stringify(user, null, 2));
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/googlelogin`, {
            // const res = await axios.post("http://127.0.0.1:5000/googlelogin", {
            email: user.email,
            name: user.name,
            image: user.image,
          });
          if (res.status === 200) {
            user.id = res.data.id;
            user.message = res.data.message;
            user.role = res.data.role;
          }

        } catch (error) {
          console.error("Kakao 로그인 후 백엔드 전송 실패:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.message = user.message;
        token.role = user.role;
        token.status = user.status;
        token.response = user.response;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.message = token.message;
      session.user.role = token.role;
      session.user.status = token.status;
      session.user.response = token.response;
      return session;
    },
  },

});

export { handler as GET, handler as POST };
