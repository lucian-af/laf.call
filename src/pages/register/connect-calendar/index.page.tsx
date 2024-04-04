import { Heading, MultiStep, Button, Text } from '@laf.ui/react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { Container, Header } from '../../register/styles'
import { ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { TextError } from 'styles/global'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const router = useRouter()
  const session = useSession()

  const isSingnedIn = session.status === 'authenticated'
  const hasAuthError =
    !!router.query.error &&
    !isSingnedIn &&
    !router.query.error.includes('email')

  const hasAuthErrorEmail =
    !!router.query.error && !isSingnedIn && router.query.error.includes('email')

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | LAF Call" noindex />
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
              disabled={isSingnedIn}
              onClick={handleConnectCalendar}
            >
              {isSingnedIn ? 'Conectado' : 'Conectar'}
              {isSingnedIn ? <Check /> : <ArrowRight />}
            </Button>
          </ConnectItem>

          {hasAuthError && (
            <TextError>
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </TextError>
          )}

          {hasAuthErrorEmail && (
            <TextError>
              E-mail vinculado à outra conta. Use outro e-mail ou acesse a conta
              já cadastrada.
            </TextError>
          )}

          <Button
            onClick={handleNavigateNextStep}
            type="submit"
            disabled={!isSingnedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
