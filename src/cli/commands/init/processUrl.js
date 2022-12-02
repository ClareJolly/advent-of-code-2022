const fs = require('fs-extra')
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const fetch = require('node-fetch')
const chalk = require('chalk')

const fetchHtml = async url => {
  const cookie = process.env.AOC_SESSION
  // let challenge = ''
  // let input = ''
  const options = {
    headers: {
      cookie: `session=${cookie}`,
    },
  }
  const challengeResponse = await fetch(url, options)
  const challenge = await challengeResponse.text()
  const inputResponse = await fetch(`${url}/input`, options)
  const input = await inputResponse.text()


  return { challenge, input }
}

const replacements = {
  generic: [
    [/<em>/g, '**'],
    [/<\/em>/g, '**'],
    [/<em class=\"star\}">star<\/em>/g, '⭐'],
    [/<a href="(.*)" target.*>(.*)(<\/a>)/g, `[$2]($1)`],
    [/(your puzzle input)/g, '[(your puzzle input)](data/input.txt)'],
  ],
  h2: [
    [/--- /g, '# 🎄 🎅 🎄 '],
    [/ ---/g, ' 🎄 🎅 🎄 '],
  ],
  ul: [
    [/<li>/g, '- '],
    [/<\/li>/g, ''],
    [/<code>/g, '`'],
    [/<\/code>/g, '`'],
  ],
  p: [
    [/<code>/g, '`'],
    [/<\/code>/g, '`'],
  ],
  pre: [
    [/<code>/g, '\n```\n'],
    [/<\/code>/g, '\n```'],
  ],
}
const getDescription = document => {
  const sub = document.querySelector(`article.day-desc`)
  const children = Array.from(sub.children).map(p => {
    const tag = p.tagName.toLowerCase()
    const text = p.innerHTML
    const replacementsToUse = replacements[tag] || []
    // const regex = /<em class=\"star\">star<\/em > /g;

    const replaceRegex = [...replacementsToUse, ...replacements.generic]
    return replaceRegex.reduce((a, [regex, replacement]) => {
      // if (tag === 'pre') {

      // }
      return a.replace(regex, replacement)
    }, text)
  })
  return children
}

const getTitle = document => {
  const sub = document.querySelectorAll(`article.day-desc > h2`)
  return Array.from(sub)
    .map(p => p.innerHTML.replace(/\s?---\s?/g, ''))
    .slice(0, -1)
}

const processUrl = async ({ url, day }) => {
  try {
    const { challenge: html, input } = await fetchHtml(url)
    fs.writeFileSync(path.join(__dirname, 'input.txt'), input)

    const template = path.join(__dirname, '../../../tmp')
    const dayFolder = String(day).padStart(2, '0')
    // const dayFolder = String(day)
    const copyTo = path.join(__dirname, '../../..', dayFolder)

    if (fs.existsSync(copyTo)) {
      console.log(chalk.magenta('day already initialised'))
      return
    }

    const dom = new JSDOM(html)
    const { window } = dom
    const { document } = window
    const title = url ? getTitle(document) : '<TBC>'
    const description = url ? getDescription(document) : '<TBC>'

    // fs.copySync(template, copyTo)

    const solution1 = [
      `[Solution Part 1](./part1/index.ts)`,
      `🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄`,
      '## Part 2',
      'TBA', `[Solution Part 2](./part2/index.ts)`,
      `🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄 🎄`,
    ]

    fs.writeFileSync(
      path.join(copyTo, 'summary.md'),
      description.join('\n\n') + solution1.join('\n\n'),
    )
    fs.writeFileSync(
      path.join(copyTo, 'data/input.txt'),
      input
    )

    const indexRow = `| [${title}](src/${dayFolder}/summary.md#readme) |      |      |\n`
    fs.appendFileSync(path.join(__dirname, '../../../../README.md'), indexRow)
    return {
      title,

      description,
    }

  } catch (e) {
    console.error(e)
  }
}

module.exports = processUrl
