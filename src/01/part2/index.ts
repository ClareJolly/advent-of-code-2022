import { arrToNumbers } from '../../helpers'
import getIncreases from '../helpers/getIncreases'

const part2 = (inputData: string[]): number => {
  const data = arrToNumbers(inputData)

  let batches: number[] = []

  let i = 0

  while (i < data.length - 2) {
    batches.push(data[i] + data[i + 1] + data[i + 2])
    i++
  }

  return getIncreases(batches)
}

export default part2
