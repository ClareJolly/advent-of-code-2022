import { batchByBlankLines } from '../../helpers'
import { parseData } from '../helpers'
import { Monkey } from '../types'

const runOperation = (monkey: Monkey, n: number, i: number, data: Monkey[]) =>
  monkey.operation(n) % data[i].divisor

const part2 = (inputData: string[]): number => {
  const batches = batchByBlankLines(inputData).map(d => d.map(dd => dd.trim()))

  const data = parseData(batches)
  const ROUND = 10000

  const checked = Array(data.length).fill(0)
  const items = data.map(d => d.startingItems.map(n => Array(data.length).fill(n)))

  for (let r = 0; r < ROUND; r++) {
    data.forEach((monkey, i) => {
      items[i].forEach((num: number[]) => {
        const x = num.map((n, i) => runOperation(monkey, n, i, data))

        const toValue = x[i] % monkey.divisor === 0 ? monkey.true : monkey.false

        items[toValue].push(x)
        checked[i] += 1
      })
      items[i] = []
    })
  }

  checked.sort((a, b) => b - a)

  return checked[0] * checked[1]
}

export default part2
