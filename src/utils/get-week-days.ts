interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(Date.UTC(2023, 7, day)))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return capitalize(weekDay)
    })
}

export function capitalize(value: string) {
  if (!value) return value

  const firstLetter = value.substring(0, 1).toUpperCase()
  const otherLetters = value.substring(1)
  return firstLetter.concat(otherLetters)
}
