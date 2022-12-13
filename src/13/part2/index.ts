type Packet = number | number[]

const isNumber = (val: number | number[]): boolean => !Array.isArray(val) && !isNaN(val)

const comparePacket = (left: Packet[], right: Packet[]): boolean | null => {
  for (let i = 0; i < left.length; i++) {
    const a = left[0]
    const b = right[0]
    if (b === undefined) return false

    let match: boolean | null = null

    if (isNumber(a) && isNumber(b)) {
      if (a < b) return true
      if (a > b) return false
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      match = comparePacket(a, b)
    }
    if (Array.isArray(a)) {
      match = comparePacket(a, [b])
    }
    if (Array.isArray(b)) {
      match = comparePacket([a], b)
    }
    if (typeof match === 'boolean') return match!
  }

  return left.length < right.length ? true : null
}

const part2 = (inputData: string[]): number => {
  const pairs = inputData.filter(d => d.length).map(d => JSON.parse(d))

  const divider1 = [[2]]
  const divider2 = [[6]]

  pairs.push(divider1, divider2)

  pairs.sort((a, b) => (comparePacket(a, b) ? -1 : 1))

  let key1 = pairs.indexOf(divider1) + 1
  let key2 = pairs.indexOf(divider2) + 1

  return key1 * key2
}

export default part2
