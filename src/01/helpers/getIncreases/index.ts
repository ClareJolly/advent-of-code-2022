const getIncreases = (data: number[]): number => {
  let increase = 0

  let i = 1
  while (i < data.length) {
    if (data[i] > data[i - 1]) increase++
    i++
  }
  return increase
}

export default getIncreases
