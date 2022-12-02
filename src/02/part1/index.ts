const part1 = (inputData: string[]): number => {
  const key: Record<string, number> = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 }

  const moves = inputData.map(d => d.split(' '))
  const scores = moves.map(([p1, p2]) => {
    if (key[p1] === key[p2]) return 3 + key[p2]
    else if (key[p1] - key[p2] === -1 || key[p1] - key[p2] === 2) return 6 + key[p2]
    else return 0 + key[p2]
  })

  return scores.reduce((a, b) => a + b)
}

export default part1
