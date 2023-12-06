import { Heading, Text } from '@laf.ui/react'
import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'
import { Container, Main, Preview } from './styles'
import ClaimUsernameForm from './ClaimUsernameForm'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>LAF Call</title>
      </Head>
      <Container>
        <Main>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Main>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário de exemplo do funcionamento da aplicação"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
