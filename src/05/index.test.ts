import run from '.'

describe('Run all', () => {
  it('returns the expected values', () => {
    const result = run()
    expect(result).toEqual({ part1: 'FZCMJCRHZ', part2: 'JSDHQMZGF' })
  })
})
