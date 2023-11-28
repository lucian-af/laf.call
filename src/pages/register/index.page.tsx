import { Button, Heading, MultiStep, Text, TextInput } from '@laf.ui/react'
import { Container, Form, Header, FormError } from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve conter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Permitido somente letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve conter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

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

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome do usuário</Text>
          <TextInput
            prefix="laf.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />
          <FormError>{errors.username?.message}</FormError>
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="seu-usuario" {...register('name')} />
          <FormError>{errors.name?.message}</FormError>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
