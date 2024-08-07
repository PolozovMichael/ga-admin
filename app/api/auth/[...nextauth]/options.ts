import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phoneNumber: {
          label: 'Phone number:',
          type: 'text',
          placeholder: 'Your phone number',
        },
      },
      async authorize(credentials) {
        const user = {
          id: '21',
          phoneNumber: '+77085293881',
        }
        if (user && credentials?.phoneNumber === user.phoneNumber) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
