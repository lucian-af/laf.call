import { Button, Heading, MultiStep, Text, TextInput } from '@laf.ui/react'
import { Container, Form, Header } from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao LAF Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form">
        <label>
          <Text size="sm">Nome do usuário</Text>
          <TextInput prefix="laf.com/" placeholder="seu-usuario" />
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="seu-usuario" />
        </label>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
