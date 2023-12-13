import { Heading, MultiStep, Button, Text } from '@laf.ui/react'
import { ArrowRight } from '@phosphor-icons/react'
// import { useRouter } from 'next/router'
import { Container, Header } from '../../register/styles'
import Head from 'next/head'
import { ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'

export default function ConnectCalendar() {
  // const router = useRouter()

  const session = useSession()

  const conectado: boolean = session.status === 'authenticated'

  return (
    <>
      <Head>
        <title>Registrar</title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            <Button
              variant="secondary"
              size="sm"
              disabled={conectado}
              onClick={() => signIn('google')}
            >
              {conectado ? 'Conectado' : 'Conectar'}
              <ArrowRight />
            </Button>
          </ConnectItem>

          <Button type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
