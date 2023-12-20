import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@laf.ui/react'
import { Container, Header } from '../styles'
import Head from 'next/head'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export default function TimeIntervals() {
  return (
    <>
      <Head>
        <title>Registrar</title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Quase lá</Heading>
          <Text>
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>
          <MultiStep size={4} currentStep={3} />
        </Header>

        <IntervalBox as="form">
          <IntervalContainer>
            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Segunda-feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Terça-feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>
          </IntervalContainer>

          <Button type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  )
}
