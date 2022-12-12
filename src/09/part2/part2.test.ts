import part2 from '.'
import { getDataForTest } from '../../../test/unit/utils'
import fileToArray from '../../helpers/fileToArray'
import path from 'path'

const { testData, realData } = getDataForTest(__dirname)
console.log('  ~ file: part2.test.ts:7 ~ testData', testData)
const testData2 = fileToArray(path.join(__dirname, `../data/testData2.txt`))

describe('part2', () => {
  it('returns the expected answer with test data', () => {
    const result = part2(testData2)

    expect(result).toStrictEqual(36)
  })

  it('returns the expected answer with real data', () => {
    const result = part2(realData)

    expect(result).toStrictEqual(2653)
  })
})
