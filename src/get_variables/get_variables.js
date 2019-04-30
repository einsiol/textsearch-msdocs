import minimist from 'minimist'

const [,, ...argv] = process.argv

const {
  '_': searchTerms,
  dir = './',
  filter = '.doc'
} = minimist(argv)

export { searchTerms, dir, filter }
