import { prisma } from '@lib/prisma'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { parseCookies, destroyCookie } from 'nookies'

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const { '@laf-call:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) throw new Error('User ID not found on cookies.')

      const userUpdated = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, '@laf-call:userId', { path: '/' })

      return {
        id: userUpdated.id,
        email: userUpdated.email!,
        name: userUpdated.name,
        username: userUpdated.username,
        avatar_url: userUpdated.avatar_url!,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        email: user.email!,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        email: user.email!,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider_account_id: providerAccountId,
            provider,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account

      return {
        id: user.id,
        email: user.email!,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },

    async updateUser(user) {
      const userUpdated = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          avatar_url: user.avatar_url,
          email: user.email,
        },
      })

      return {
        id: userUpdated.id,
        email: userUpdated.email!,
        name: userUpdated.name,
        username: userUpdated.username,
        avatar_url: userUpdated.avatar_url!,
        emailVerified: null,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        expires,
        sessionToken,
        userId,
      }
    },

    async getSessionAndUser(sessionToken) {
      const sessionExisting = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!sessionExisting) return null

      const { user, ...session } = sessionExisting

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: user.id,
          email: user.email!,
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const sessionUpdated = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        expires: sessionUpdated.expires,
        sessionToken: sessionUpdated.session_token,
        userId: sessionUpdated.user_id,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
