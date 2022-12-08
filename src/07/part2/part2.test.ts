import part2 from '.'
import { getDataForTest } from '../../../test/unit/utils'

const { testData, realData } = getDataForTest(__dirname)

describe('part2', () => {
  it('returns the expected answer with test data', () => {
    const result = part2(testData[0])

    expect(result).toStrictEqual(24933642)
  })

  it('returns the expected answer with real data', () => {
    const result = part2(realData)

    expect(result).toStrictEqual(5469168)
  })
})