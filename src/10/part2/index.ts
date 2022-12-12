import { create2DArray } from '../../helpers'

const part2 = (inputData: string[]): string[] => {
  let cycle = 0
  let x = 1
  let visible = [0, 1, 2]
  let row = 0
  const symbol = '▓'
  const blank = '░'
  const columns = 40
  const rows = 6

  const crtScreen = create2DArray<string>(rows, columns, undefined, blank)

  const data = inputData.map(d => d.split(' '))
  data.forEach(([a, b]) => {
    if (a === 'noop') {
      if (visible.includes(cycle)) {
        crtScreen[row][cycle] = symbol
      }
      cycle += 1
      if (cycle % columns === 0) {
        cycle = 0
        row += 1
      }
    } else {
      for (let i = 0; i < 2; i++) {
        if (visible.includes(cycle)) {
          crtScreen[row][cycle] = symbol
        }
        cycle += 1
        if (cycle % columns === 0) {
          cycle = 0
          row += 1
        }
        if (i === 1) {
          const v = Number(b)
          x += v
          visible = [x - 1, x, x + 1]
        }
      }
    }
  })

  const result = crtScreen.map(row => {
    console.log(row.join(''))
    return row.join('')
  })
  return result
}

export default part2
