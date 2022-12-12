const directionsMap = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]
const coOrdsToString = ([row, col]: number[]) => `${row} ${col}`

const part2 = (inputData: string[]): number => {
  const data = inputData.map(d => d.split(''))

  const [numberOfRows, numberOfCols] = [data.length, data[0].length]

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

  const isAtMostOneHigher =
    (currentElevation: number): ((arg: number[]) => boolean) =>
    ([row, col]: number[]): boolean => {
      return mapped[row][col] - currentElevation <= 1
    }

  const paths: number[] = []
  starts.forEach(start => {
    const queue: [[number[], number]] = [[start, 0]]
    const visited = new Set([coOrdsToString(start)])
    let bestPath = Number.POSITIVE_INFINITY

    while (queue.length) {
      const [pos, steps] = queue.shift()!

      if (coOrdsToString(pos) === coOrdsToString(end)) {
        bestPath = steps
        break
      }

      const checkPositions = directionsMap.map(([dRow, dCol]) => {
        return [pos[0] + dRow, pos[1] + dCol]
      })
      const isOnGrid = checkPositions.filter(
        ([row, col]: number[]) => row >= 0 && row < numberOfRows && col >= 0 && col < numberOfCols,
      )
      const isValid = isOnGrid.filter(isAtMostOneHigher(mapped[pos[0]][pos[1]]))
      const notVisited = isValid.filter(pos => !visited.has(coOrdsToString(pos)))
      notVisited.forEach(pos => {
        visited.add(coOrdsToString(pos))
        queue.push([pos, steps + 1])
      })
    }

    return paths.push(bestPath)
  })
  return paths.sort((a, b) => a - b)[0]
}

export default part2
