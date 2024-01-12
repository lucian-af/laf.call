import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@lib/prisma'

const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z
          .number({
            required_error: 'Obrigatório informar um dia da semana.',
          })
          .min(0, {
            message:
              'Dia da semana deve ser maior ou igual a zero e menor que 6.',
          })
          .max(6, {
            message: 'Dia da semana deve ser menor ou igual a 6.',
          }),
        startTimeInMinutes: z.number({
          required_error: 'Obrigatório informar os minutos de início.',
        }),
        endTimeInMinutes: z.number({
          required_error: 'Obrigatório informar os minutos de término.',
        }),
      }),
    )
    .max(7, {
      message: 'Limite de dias da semana foi ultrapassado. Limite = 7.',
    })
    .refine((intervals) => intervals.length > 0, {
      message: 'Obrigatório informar pelo menos um dia da semana.',
    })
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        ),
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) return res.status(401).end()

  const result = timeIntervalsSchema.safeParse(req.body)
  if (!result.success) {
    const errors = [...new Set(result.error.errors.map((err) => err.message))]
    return res.status(400).json({
      success: false,
      details: errors.join(', '),
    })
  }

  const { intervals } = result?.data

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
