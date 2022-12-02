import { arrToNumbers, batchByBlankLines } from '../../helpers'

const part1 = (inputData: string[]): number => {
  const elvesItems = batchByBlankLines(inputData).map(batch => arrToNumbers(batch))

  const totals = elvesItems.map(items =>
    items.reduce((a, b) => {
      return a + b
    }, 0),
  )

  return totals.sort((a, b) => b - a)[0]
}

export default part1
