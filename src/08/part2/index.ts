interface TreeDetails {
  visible?: boolean
  edge: boolean
  x: number
  y: number
  height: number
  left?: number[]
  right?: number[]
  up?: number[]
  down?: number[]
  leftScore?: number
  rightScore?: number
  upScore?: number
  downScore?: number
}

export const adjacentConfig = [
  { yOffset: -1, xOffset: 0 },
  { yOffset: 1, xOffset: 0 },
  { yOffset: 0, xOffset: -1 },
  { yOffset: 0, xOffset: 1 },
]

const part2 = (inputData: string[]): number => {
  const grid = inputData.map(d => d.split('').map(n => Number(n)))
  const visibleDetails: Record<string, TreeDetails> = {}
  const details = grid
    .map((g, y) => {
      return g.map((height, x) => {
        const treeDetails: TreeDetails = { edge: false, x, y, height }
        visibleDetails[`${y}*${x}`] = { edge: false, x, y, height }
        if (y === 0 || y === grid.length - 1 || x === 0 || x === grid.length - 1) {
          visibleDetails[`${y}*${x}`].visible = true
          visibleDetails[`${y}*${x}`].edge = true
          treeDetails.visible = true
          treeDetails.edge = true
        }
        return treeDetails
      })
    })
    .flat()

  details.forEach((tree, i) => {
    const left = []
    const up = []
    const right = []
    const down = []
    let checkingX = tree.x
    let checkingY = tree.y
    while (checkingX > 0) {
      left.push(grid[tree.y][checkingX - 1])

      checkingX = checkingX - 1
    }
    checkingX = tree.x
    while (checkingX < grid.length - 1) {
      right.push(grid[tree.y][checkingX + 1])

      checkingX = checkingX + 1
    }
    while (checkingY > 0) {
      up.push(grid[checkingY - 1][tree.x])

      checkingY = checkingY - 1
    }
    checkingY = tree.y
    while (checkingY < grid[0].length - 1) {
      down.push(grid[checkingY + 1][tree.x])

      checkingY = checkingY + 1
    }

    if (
      left.every(h => h < tree.height) ||
      right.every(h => h < tree.height) ||
      up.every(h => h < tree.height) ||
      down.every(h => h < tree.height)
    ) {
      details[i].visible = true
    } else {
      details[i].visible = false
    }

    const leftScore = left.findIndex(f => f >= tree.height)
    const rightScore = right.findIndex(f => f >= tree.height)
    const upScore = up.findIndex(f => f >= tree.height)
    const downScore = down.findIndex(f => f >= tree.height)

    details[i].left = left.length ? left : [0]
    details[i].right = right.length ? right : [0]
    details[i].up = up.length ? up : [0]
    details[i].down = down.length ? down : [0]
    details[i].leftScore = leftScore < 0 ? left.length : leftScore + 1
    details[i].rightScore = rightScore < 0 ? right.length : rightScore + 1
    details[i].upScore = upScore < 0 ? up.length : upScore + 1
    details[i].downScore = downScore < 0 ? down.length : downScore + 1
  })
  return details
    .map(d => {
      return d.downScore! * d.upScore! * d.leftScore! * d.rightScore!
    })
    .sort((a, b) => b - a)[0]
}

export default part2
