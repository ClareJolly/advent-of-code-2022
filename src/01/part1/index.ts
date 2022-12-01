import { arrToNumbers } from '../../helpers'
import getIncreases from '../helpers/getIncreases'

const part1 = (inputData: string[]): number => {
  const data = arrToNumbers(inputData)

  return getIncreases(data)
}

export default part1
