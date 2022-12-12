interface Position {
  x: number
  y: number
}

const part2 = (inputData: string[]): number => {
  const hPos: Position = { x: 0, y: 0 }
  const tPos: Position = { x: 0, y: 0 }

  const dirMap: Record<string, ['x' | 'y', number]> = {
    R: ['x', 1],
    L: ['x', -1],
    U: ['y', 1],
    D: ['y', -1],
  }

  const arr = Array(8)
    .fill(null)
    .map(_ => ({ x: 0, y: 0 }))

  const rope = [hPos, ...arr, tPos]

  const visited = new Set<string>()
  visited.add(`${tPos.x},${tPos.y}`)

  inputData.forEach(move => {
    const data = move.split(' ')
    const dir = data[0]
    const steps = parseInt(data[1])

    for (let i = 0; i < steps; ++i) {
      if (dirMap[dir][1] > 0) --hPos[dirMap[dir][0]]
      if (dirMap[dir][1] < 0) ++hPos[dirMap[dir][0]]

      for (let pos = 0; pos < 9; ++pos) {
        const matchTail = rope[pos + 1]
        const matchHead = rope[pos]

        const xDist = Math.abs(matchHead.x - matchTail.x)
        const yDist = Math.abs(matchHead.y - matchTail.y)
        const manDist = xDist + yDist

        const moveX = xDist >= 2 || manDist >= 3
        const moveY = yDist >= 2 || manDist >= 3

        if (moveX) {
          matchTail.x += matchHead.x > matchTail.x ? 1 : -1
        }
        if (moveY) {
          matchTail.y += matchHead.y > matchTail.y ? 1 : -1
        }
      }

      visited.add(`${tPos.x},${tPos.y}`)
    }
  })

  return visited.size
}

export default part2
