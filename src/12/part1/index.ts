const directionsMap = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]
const coOrdsToString = ([row, col]: number[]) => `${row} ${col}`

const part1 = (inputData: string[]): number => {
  const data = inputData.map(d => d.split(''))

  const [rowsTotal, colsTotal] = [data.length, data[0].length]

  let start: number[] = []
  let end: number[] = []

  const mapped: number[][] = data.map((col, y) => {
    return col.map((val, x) => {
      let newVal = val
      if (val === 'S') {
        start = [y, x]
        newVal = 'a'
      }
      if (val === 'E') {
        end = [y, x]
        newVal = 'z'
      }
      const test = /[a-z]/.test(newVal) ? newVal.charCodeAt(0) : newVal
      return test as number
    })
  })

  const isValidStep =
    (curr: number): ((arg: number[]) => boolean) =>
    ([row, col]: number[]): boolean => {
      return mapped[row][col] - curr <= 1
    }

  const queue: [[number[], number]] = [[start, 0]]
  const visited = new Set([coOrdsToString(start)])
  let bestPath = Number.POSITIVE_INFINITY

  while (queue.length) {
    const [position, steps] = queue.shift()!

    if (coOrdsToString(position) === coOrdsToString(end)) {
      bestPath = steps
      break
    }

    const checkPositions = directionsMap.map(([dRow, dCol]) => {
      return [position[0] + dRow, position[1] + dCol]
    })

    const isOnGrid = checkPositions.filter(
      ([y, x]: number[]) => y >= 0 && y < rowsTotal && x >= 0 && x < colsTotal,
    )
    const isValid = isOnGrid.filter(isValidStep(mapped[position[0]][position[1]]))
    const notVisited = isValid.filter(position => !visited.has(coOrdsToString(position)))
    notVisited.forEach(position => {
      visited.add(coOrdsToString(position))
      queue.push([position, steps + 1])
    })
  }

  return bestPath
}

export default part1
