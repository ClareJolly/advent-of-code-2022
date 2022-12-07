import run from '.'

describe('Run all', () => {
  it('returns the expected values', () => {
    const result = run()
    expect(result).toEqual({ part1: 1391690, part2: 5469168 })
  })
})
