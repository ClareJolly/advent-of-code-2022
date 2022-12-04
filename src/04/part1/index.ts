const part1 = (inputData: string[]): number => {
  const pairs = inputData.map(p =>
    p.split(',').map(x => {
      const arr = x.split('-').map(s => Number(s))
      const test = []
      let i = arr[0]
      while (i <= arr[1]) {
        test.push(i)
        i++
      }
      return test
    }),
  )

  const withOverlaps = pairs.filter(p => {
    const overlapping = p[0].filter(value => p[1].includes(value))
    return !!overlapping.length
  })
  const fullyOverlaps = withOverlaps.filter(w => {
    const larger = w[0].length > w[1].length ? w[0] : w[1]
    const smaller = w[0].length > w[1].length ? w[1] : w[0]

    const lowerIndex2 = smaller[0]
    const upperIndex2 = smaller[smaller.length - 1]

    return (
      larger.findIndex(x => x === lowerIndex2) !== -1 &&
      larger.findIndex(x => x === upperIndex2) !== -1
    )
  })

  return fullyOverlaps.length
}

export default part1
