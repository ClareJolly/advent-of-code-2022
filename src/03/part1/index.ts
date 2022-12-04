const part1 = (inputData: string[]): number => {
  const compartments = inputData.map(d => {
    const all = d.split('')
    const half = all.length / 2
    return [all.slice(0, half), all.slice(half, all.length)]
  })

  const shared = compartments.map(([a, b]) => {
    const same = a.filter(value => b.includes(value))
    const code =
      same[0].charCodeAt(0) > 95 ? same[0].charCodeAt(0) - 96 : same[0].charCodeAt(0) - 38
    return [same[0], code] as [string, number]
  })

  return shared.reduce((a, [_, b]) => {
    return a + b
  }, 0)
}

export default part1
