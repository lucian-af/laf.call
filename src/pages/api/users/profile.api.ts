import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@lib/prisma'

const updateProfileSchema = z.object({
  bio: z.string().min(3, {
    message: 'Obrigatório no mínimo 3 letras.',
  }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') return res.status(405).end()

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) return res.status(401).end()

  const result = updateProfileSchema.safeParse(req.body)
  if (!result.success) {
    const errors = [...new Set(result.error.errors.map((err) => err.message))]
    return res.status(400).json({
      success: false,
      details: errors.join(', '),
    })
  }

  const { bio } = result?.data

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return res.status(201).end()
}
