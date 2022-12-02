import { batchByBlankLines, arrToNumbers } from '../../helpers'

const part2 = (inputData: string[]): number => {
  const elvesItems = batchByBlankLines(inputData).map(batch => arrToNumbers(batch))

  const totals = elvesItems.map(items =>
    items.reduce((a, b) => {
      return a + b
    }, 0),
  )

  const topElves = totals.sort((a, b) => b - a)

  return topElves.slice(0, 3).reduce((acc, elf) => {
    return acc + elf
  }, 0)
}

export default part2
