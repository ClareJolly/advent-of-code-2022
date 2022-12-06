const part2 = (inputData: string[]): number => {
  const inputString = inputData[0]

  const data = inputString.split('')

  for (let i = 13; i < data.length; i++) {
    const checking = data.slice(i - 13, i + 1)
    if ([...new Set(checking)].length === 14) return i + 1
  }
  return 0
}

export default part2
