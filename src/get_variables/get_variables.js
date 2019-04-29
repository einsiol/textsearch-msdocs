import minimist from 'minimist'

const {_: searchTerms, dir = './', filter = '.doc'} = minimist(process.argv.slice(2))

export { searchTerms, dir, filter }