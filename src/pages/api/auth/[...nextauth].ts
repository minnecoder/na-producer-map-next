import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '../../../utils/mongodb'

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided')
        } else if (!credentials.email || !credentials.password) {
          throw new Error('No credentials provided')
        }

        const { db } = await connectToDatabase()
        const user = await db
          .collection('users')
          .findOne({ email: credentials.email })

        if (!user) {
          throw new Error('Email or Password is wrong')
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValidPassword) {
          throw new Error('Email or Password is wrong')
        }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          lat: user.lat,
          long: user.long,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          lat: token.lat,
          long: token.long,
        },
      }
    },
  },
}

export default NextAuth(authOptions)
