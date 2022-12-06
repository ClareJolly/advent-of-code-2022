const part1 = (inputData: string[]): number => {
  const inputString = inputData[0]

  const data = inputString.split('')

  for (let i = 3; i < data.length; i++) {
    const checking = data.slice(i - 3, i + 1)
    if ([...new Set(checking)].length === 4) return i + 1
  }
}

export default part1
