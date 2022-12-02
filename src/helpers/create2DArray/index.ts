import { Grid } from '../../types'

const create2DArray = <T = number>(
  rows: number,
  columns: number,
  value: (x: number, y: number) => T,
): Grid<T> => {
  let array = new Array(rows)
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(columns)
    for (let j = 0; j < columns; j++) {
      array[i][j] = value(i, j)
    }
  }

  return array
}

export default create2DArray
