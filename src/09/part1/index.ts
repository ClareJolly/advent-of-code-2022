const part1 = (inputData: string[]): number => {
  const dirMap: Record<string, ['x' | 'y', number]> = {
    R: ['x', 1],
    L: ['x', -1],
    U: ['y', 1],
    D: ['y', -1],
  }

  const hPos: { x: number; y: number } = { x: 0, y: 0 }
  const tPos: { x: number; y: number } = { x: 0, y: 0 }

  const visited = new Set<string>()

  visited.add(`${hPos.x},${tPos.y}`)

  inputData.forEach(move => {
    const data = move.split(' ')
    const dir = data[0]
    const steps = Number(data[1])

    for (let i = 0; i < steps; ++i) {
      if (dirMap[dir][1] > 0) --hPos[dirMap[dir][0]]
      if (dirMap[dir][1] < 0) ++hPos[dirMap[dir][0]]

      const xDist = Math.abs(hPos.x - tPos.x)
      const yDist = Math.abs(hPos.y - tPos.y)
      const manDist = xDist + yDist

      const moveX = xDist >= 2 || manDist >= 3
      const moveY = yDist >= 2 || manDist >= 3

      if (moveX) {
        tPos.x += hPos.x > tPos.x ? 1 : -1
      }
      if (moveY) {
        tPos.y += hPos.y > tPos.y ? 1 : -1
      }

      visited.add(`${tPos.x},${tPos.y}`)
    }
  })

  return visited.size
}

export default part1
