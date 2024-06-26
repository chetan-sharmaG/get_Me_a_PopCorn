import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDb';

console.warn("SECRET=" + process.env.NEXTAUTH_SECRET)
console.warn("GITHUB ID =" + process.env.GITHUB_ID)
console.warn("GITHUB SECRET=" + process.env.GITHUB_SECRET)
console.warn("GOOGLE ID=" + process.env.GOOGLE_ID)
console.warn("GOOGLE SECRET=" + process.env.GOOGLE_SECRET)


export const authoptions = NextAuth({
  
  providers: [

    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),

  ],
  secret: "f6bfe64f36c73f480d5851831d684d2e",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        //connect to db
        await connectDB()

        const currentUser = await User.findOne({ email: user.email })



        if (!currentUser) {
          console.log("Creating User")
          const newUser = await User.create({
            email: user.email,
            username: user.name,
          
          })
        }
        return true
      }
      else if (account.provider === 'google') {
        await connectDB()
       
        //Check if the user exists
        const currentUser = await User.findOne({ email: user.email })
        console.log("user=" + user.name)


        if (!currentUser) {
          console.log("Creating User")
          const newUser = await User.create({
            email: user.email,
            username: user.name,
             })
        }
        
        return true
      }
    }
    ,
    async session({ session, user, token }) {
      var firstTimeLogin
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        firstTimeLogin = dbUser.firstTimeLogin;
        if (firstTimeLogin) {
          dbUser.firstTimeLogin = false;
          await dbUser.save()
        }
      }
      session.user.pageName = dbUser.pageName
      session.user.firstTimeSetupDone = dbUser.firstTimeSetupDone
      session.user.name = dbUser.name;
      session.user.pageName = dbUser.pageName
      session.user.subscribers = dbUser.subscribed
      return session
    },
  },


})
// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authoptions);

// export default authHandler;

export { authoptions as GET, authoptions as POST }
