import { Avatar, Heading, Text } from '@laf.ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

type ScheduleUserProps = {
  user: {
    name: string
    avatarUrl: string
    bio: string
  }
}

export default function User({ user }: ScheduleUserProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | LAF Call`} />
      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>
        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  const umDia = 60 * 60 * 24
  return {
    props: {
      user: {
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
      },
    },
    revalidate: umDia,
  }
}
