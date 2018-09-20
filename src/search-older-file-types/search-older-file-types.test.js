import test from 'ava'

import searchOlderFileTypes from './search-older-file-types'

test('Able to read doc format', async t => {
  const file = 'test_source/the-great-sea.doc'
  const searchTerms = ['not', 'where']
  let found = null
  try {
    found = await searchOlderFileTypes({file, searchTerms})
  }
  catch (error) {
    t.fail(error)
  }

  t.pass(found)

})