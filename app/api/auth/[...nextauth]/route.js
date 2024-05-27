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
export const authoptions = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
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
            coverPic: 'https://64.media.tumblr.com/09e2bef3a1fbf60fa4e77a64184454ff/tumblr_ou7xynInI91snbyiqo2_540.gifv',
            profilePic: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjY5cGh5M213aHozMHltdmM4Y3EyZXBoMTUwMjhyd3YwN3hhbTl2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGvzjS7yqXX7NHW/giphy.gif'
          })
        }
        return true
      }
      else if (account.provider === 'google') {
        await connectDB()
        // const client = await mongoose.connect("mongodb://localhost:27017/popcorn");
        //Check if the user exists
        const currentUser = await User.findOne({ email: user.email })
        console.log("user=" + user.name)


        if (!currentUser) {
          console.log("Creating User")
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            coverPic: 'https://64.media.tumblr.com/09e2bef3a1fbf60fa4e77a64184454ff/tumblr_ou7xynInI91snbyiqo2_540.gifv',
            profilePic: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjY5cGh5M213aHozMHltdmM4Y3EyZXBoMTUwMjhyd3YwN3hhbTl2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGvzjS7yqXX7NHW/giphy.gif'
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
      return session
    },
  },
  

})

export { authoptions as GET, authoptions as POST }