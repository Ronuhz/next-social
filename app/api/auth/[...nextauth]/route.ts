import NextAuth, { DefaultSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
		} & DefaultSession['user']
	}
}

const prismaAdapter = PrismaAdapter(prisma)

// *overrides the user creation process provided by the prisma adapter
// *to include a username for the user based on the email
// *ex. from "john@example.com" username will be "john"
// @ts-ignore
prismaAdapter.createUser = (data) => {
	const atIndex = data.email.indexOf('@')
	const username = data.email.substring(0, atIndex).toLowerCase()

	return prisma.user.create({
		data: { ...data, username },
	})
}

export const authOptions: NextAuthOptions = {
	adapter: prismaAdapter,
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			const dbUser = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (!dbUser) {
				if (user) {
					token.id = user.id
				}
				return token
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			}
		},
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id as string
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
			}

			return session
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
