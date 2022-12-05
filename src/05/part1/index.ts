import { batchByBlankLines } from '../../helpers'

const getstacksWithFiller = (stacksText: string[]): string[][] => {
  const numberOfStacks = stacksText.pop()?.replace(/ /g, '').split('').length

  const newStacks = stacksText.map(s =>
    s
      .replace(/\s{4}/g, '[*]')
      .replace(/ /g, '')
      .split('][')
      .map(x => x.replace(/\[|\]/g, '')),
  )
  const tidyStacks = newStacks.map(n => {
    if (n.length < numberOfStacks!) {
      return [...n, ...Array(numberOfStacks! - n.length).fill('*')]
    }
    return n
  })
  return tidyStacks[0].map((_, colIndex) => tidyStacks.map(row => row[colIndex]))
}

const getCleanStacks = (stacksText: string[]) => {
  const stacks = getstacksWithFiller(stacksText)
  return stacks.map(x => {
    const ind = x.findIndex(s => s !== '*')
    return x.slice(ind)
  })
  return stacks
}

interface Move {
  move: number
  from: number
  to: number
  fromOrig: number
  toOrig: number
}
const getMoves = (movesText: string[]): Move[] => {
  return movesText.reduce((a, text) => {
    const matches = text.match(/^move (.*) from (.*) to (.*)$/)!
    const [move, from, to] = matches?.slice(1, 4).map(n => Number(n))
    a.push({ move, from: from - 1, to: to - 1, fromOrig: from, toOrig: to })
    return a
  }, [] as Move[])
}

const part1 = (inputData: string[]): string => {
  const [stacksText, movesText] = batchByBlankLines(inputData)

  const stacks = getCleanStacks(stacksText)

  const moves = getMoves(movesText)

  const newStacks = [...stacks]
  moves.forEach(({ move, from, to }) => {
    newStacks[to].unshift(...newStacks[from].slice(0, move).reverse())
    for (let i = 0; i < move; i++) {
      newStacks[from].shift()
    }
  })

  return newStacks.map(n => n[0]).join('')
}

export default part1
