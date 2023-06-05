import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: any
      name: string
      email: string
      lat: string
      long: string
      image: string
    }
  }
}

declare module 'next-auth' {
  interface User {
    id: any
    name: string
    email: string
    lat: string
    long: string
    image: string
  }
}
