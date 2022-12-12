interface Instructions {
  duration: number
  action: (arg: number) => number
  cycleRange: number[]
  cycle: number
}

const part1 = (inputData: string[]): number => {
  let cycle = 0
  let x = 1
  const checkCycles = [20, 60, 100, 140, 180, 220]
  let cyclesCount = 1

  const data: Instructions[] = inputData
    .map(d => d.split(' '))
    .map(([a, b]) => {
      const val = {
        duration: 2,
        action: (x: number) => x + Number(b),
        cycleRange: [cyclesCount, cyclesCount + 1],
      }
      if (a === 'noop') {
        const val = { duration: 1, action: (x: number) => x, cycleRange: [cyclesCount] }
        cyclesCount++
        return val
      }
      cyclesCount++
      cyclesCount++
      return val
    }) as Instructions[]

  return data
    .map(d => {
      let signalStrength = 0

      d.cycleRange.forEach((_, i) => {
        if (checkCycles.includes(++cycle)) signalStrength = cycle * x
        if (i === 1) x = d.action(x)
      })

      return signalStrength
    })
    .reduce((a, c) => a + c)
}

export default part1
