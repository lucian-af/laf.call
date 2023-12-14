import { prisma } from '@lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Nome de usuário indisponível.',
    })
  }

  const user = await prisma.user.create({
    data: { name, username },
  })

  const seteDias = 60 * 60 * 24 * 7
  setCookie({ res }, '@laf-call:userId', user.id, {
    maxAge: seteDias,
    path: '/',
  })

  return res.status(201).json(user)
}
