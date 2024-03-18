import { Button, Text, TextArea, TextInput } from '@laf.ui/react'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { TextError } from 'styles/global'

export function ConfirmStep() {
  return (
    <ConfirmForm as="form">
      <FormHeader>
        <Text>
          <CalendarBlank />
          18 de Março de 2024
        </Text>

        <Text>
          <Clock />
          20:30h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" />
        <TextError>Ops! Tá faltando o nome completo</TextError>
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="joaocorça@exemplo.com" />
        <TextError>Ops! Tá faltando o e-mail</TextError>
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>

        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
