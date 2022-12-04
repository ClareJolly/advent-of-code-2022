const part2 = (inputData: string[]): number => {
  const rucksacks = []
  const matches = []
  const chunkSize = 3
  for (let i = 0; i < inputData.length; i += chunkSize) {
    const chunk = inputData.map(d => d.split('')).slice(i, i + chunkSize)
    rucksacks.push(chunk)
    var result = chunk.shift()!.filter(function (v) {
      return chunk.every(a => {
        return a.indexOf(v) !== -1
      })
    })

    const code =
      result[0].charCodeAt(0) > 95 ? result[0].charCodeAt(0) - 96 : result[0].charCodeAt(0) - 38
    matches.push([result[0], code] as [string, number])
  }

  return matches.reduce((a, [_, b]) => {
    return a + b
  }, 0)
}

export default part2
