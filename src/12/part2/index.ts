const directionsMap = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]
const coOrdsToString = ([row, col]: number[]) => `${row} ${col}`

const part2 = (inputData: string[]): number => {
  const data = inputData.map(d => d.split(''))

  const [rowsTotal, colsTotal] = [data.length, data[0].length]

  let starts: number[][] = []
  let end: number[] = []

  const mapped: number[][] = data.map((col, y) => {
    return col.map((val, x) => {
      let newVal = val
      if (val === 'S' || val === 'a') {
        starts.push([y, x])
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

  const paths: number[] = []
  starts.forEach(start => {
    const queue: [[number[], number]] = [[start, 0]]
    const visited = new Set([coOrdsToString(start)])
    let bestPath = Number.POSITIVE_INFINITY

    while (queue.length) {
      const [position, steps] = queue.shift()!

      if (coOrdsToString(position) === coOrdsToString(end)) {
        bestPath = steps
        break
      }

      const checkpositionitions = directionsMap.map(([dRow, dCol]) => {
        return [position[0] + dRow, position[1] + dCol]
      })
      const isOnGrid = checkpositionitions.filter(
        ([y, x]: number[]) => y >= 0 && y < rowsTotal && x >= 0 && x < colsTotal,
      )
      const isValid = isOnGrid.filter(isValidStep(mapped[position[0]][position[1]]))
      const notVisited = isValid.filter(position => !visited.has(coOrdsToString(position)))
      notVisited.forEach(position => {
        visited.add(coOrdsToString(position))
        queue.push([position, steps + 1])
      })
    }

    return paths.push(bestPath)
  })
  return paths.sort((a, b) => a - b)[0]
}

export default part2
