import part1 from '.'
import { getDataForTest } from '../../../test/unit/utils'

const { testData, realData } = getDataForTest(__dirname)

describe('part1', () => {
  const otherTests: [string[], number][] = [
    [[`bvwbjplbgvbhsrlpgdmjqwftvncz`], 5],
    [[`nppdvjthqldpwncqszvftbrmjlhg`], 6],
    [[`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`], 10],
    [[`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`], 11],
  ]

  it('returns the expected answer with test data', () => {
    const result = part1(testData[0])

    expect(result).toStrictEqual(7)
  })

  it('returns the expected answer with test data', () => {
    const result = part1(otherTests[0][0])

    expect(result).toStrictEqual(otherTests[0][1])
  })

  it('returns the expected answer with test data', () => {
    const result = part1(otherTests[1][0])

    expect(result).toStrictEqual(otherTests[1][1])
  })

  it('returns the expected answer with test data', () => {
    const result = part1(otherTests[2][0])

    expect(result).toStrictEqual(otherTests[2][1])
  })

  it('returns the expected answer with test data', () => {
    const result = part1(otherTests[3][0])

    expect(result).toStrictEqual(otherTests[3][1])
  })

  it('returns the expected answer with real data', () => {
    const result = part1(realData)

    expect(result).toStrictEqual(1238)
  })
})
