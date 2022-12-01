import { Grid } from '../../types'

const create2DArray = <T = number>(
  rows: number,
  columns: number,
  value: (x: number, y: number) => T,
): Grid<T> => {
  var array = new Array(rows)
  for (var i = 0; i < rows; i++) {
    array[i] = new Array(columns)
    for (var j = 0; j < columns; j++) {
      array[i][j] = value(i, j)
    }
  }

  return array
}

export default create2DArray
