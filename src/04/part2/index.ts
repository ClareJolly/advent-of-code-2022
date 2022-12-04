const part2 = (inputData: string[]): number => {
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

  return withOverlaps.length
}

export default part2
