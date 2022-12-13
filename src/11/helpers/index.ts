import { Monkey } from '../types'

export const getNumbers = (val: string) => (val.match(/-?\d+/g) || []).map(Number)

export const defineOperation = (val: string) => {
  const [a, b] = val.split(' ').slice(-2)
  if (a === '+') return (n: number) => n + Number(b)
  if (b === 'old') return (n: number) => n * n
  return (n: number) => n * Number(b)
}

export const parseData = (batches: string[][]): Monkey[] => {
  return batches.map((batch, i) => ({
    monkey: i,
    startingItems: batch[1]
      .replace(/Starting items: /g, '')
      .split(', ')
      .map(n => Number(n)),
    operation: defineOperation(batch[2]),
    divisor: getNumbers(batch[3])[0],
    true: getNumbers(batch[4])[0],
    false: getNumbers(batch[5])[0],
  }))
}
