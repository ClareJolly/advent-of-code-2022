import yargs from 'yargs'
const argv = yargs.argv

const run = async () => {
  const day = argv.day || argv.d || '01'
  console.log('  ~ file: index.ts:6 ~ run ~ day', day)
  try {
    const { default: dayFunc } = await import(`./${day}`)
    dayFunc()
  } catch (e) {
    console.error('Error', e)
  }
}

run()
