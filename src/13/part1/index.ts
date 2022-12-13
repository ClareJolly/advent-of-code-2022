import { batchByBlankLines } from '../../helpers'

type Packet = number | number[]

const isNumber = (val: number | number[]): boolean => !Array.isArray(val) && !isNaN(val)

const comparePacket = (left: Packet[], right: Packet[]): boolean | undefined => {
  while (left.length && right.length) {
    const a = left.shift()!
    const b = right.shift()!
    let match: boolean | undefined

    if (isNumber(a) && isNumber(b)) {
      if (a < b) return true
      if (a > b) return false
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      match = comparePacket(a, b)
    }
    if (isNumber(a) && Array.isArray(b)) {
      match = comparePacket([a], b)
    }
    if (Array.isArray(a) && isNumber(b)) {
      match = comparePacket(a, [b])
    }
    if (typeof match === 'boolean') return match!
  }

  if (left.length) return false
  if (right.length) return true
  return undefined
}

const part1 = (inputData: string[]): number => {
  const pairs = batchByBlankLines(inputData).map(d => d.map(dd => JSON.parse(dd)))
  console.dir(pairs)

  let sum = 0

  pairs.forEach((pair, i) => {
    const [left, right] = pair
    if (comparePacket(left, right)) sum += i + 1
  })

  return sum
}

export default part1
