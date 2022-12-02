const part2 = (inputData: string[]): number => {
  const key: Record<string, number> = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 }

  const moves = inputData.map(d => d.split(' '))

  const scores = moves.map(([p1, result]) => {
    if (result === 'Y') return key[p1] + 3
    if (result === 'Z' && p1 === 'C') return 7
    if (result === 'Z') return key[p1] + 7
    if (result === 'X' && p1 === 'A') return 3
    if (result === 'X') return key[p1] - 1
    return 0
  })

  return scores.reduce((a, b) => a + b)
}

export default part2
