import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
  Toast,
} from '@laf.ui/react'
import { Container, Form, Header, FormError } from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'

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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (router.query.username)
      setValue('username', String(router.query.username))
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
    } catch (error) {
      let message = 'Erro inesperado. Tente novamente.'
      if (error instanceof AxiosError && error?.response?.data?.message) {
        message = error.response.data.message
      }
      setErrorMessage(message)
      setOpen(true)
    }
  }

  return (
    <>
      <Head>
        <title>Registrar</title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao LAF Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
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
        <Toast
          title="Ops!"
          content={errorMessage}
          open={open}
          onOpenChange={setOpen}
          duration={5000}
          hasClose={false}
          position="right-top"
        />
      </Container>
    </>
  )
}
