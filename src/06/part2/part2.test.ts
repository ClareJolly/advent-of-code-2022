import part2 from '.'
import { getDataForTest } from '../../../test/unit/utils'

const { testData, realData } = getDataForTest(__dirname)

describe('part2', () => {
  const otherTests: [string[], number][] = [
    [[`bvwbjplbgvbhsrlpgdmjqwftvncz`], 23],
    [[`nppdvjthqldpwncqszvftbrmjlhg`], 23],
    [[`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`], 29],
    [[`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`], 26],
  ]

  it('returns the expected answer with test data', () => {
    const result = part2(testData[0])

    expect(result).toStrictEqual(19)
  })

  it('returns the expected answer with test data', () => {
    const result = part2(otherTests[0][0])

    expect(result).toStrictEqual(otherTests[0][1])
  })

  it('returns the expected answer with test data', () => {
    const result = part2(otherTests[1][0])

    expect(result).toStrictEqual(otherTests[1][1])
  })

  it('returns the expected answer with test data', () => {
    const result = part2(otherTests[2][0])

    expect(result).toStrictEqual(otherTests[2][1])
  })

  it('returns the expected answer with test data', () => {
    const result = part2(otherTests[3][0])

    expect(result).toStrictEqual(otherTests[3][1])
  })

  it('returns the expected answer with real data', () => {
    const result = part2(realData)

    expect(result).toStrictEqual(3037)
  })
})
