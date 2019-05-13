import test from 'ava'
import textSearch from './text-search'

test('Able to read .docx format', async t => {
  const file = 'test_source/the-great-sea.docx'
  const searchTerms = ['then', 'this']
  let found = null
  try {
    found = await textSearch({file, searchTerms})
  }
  catch (error) {
    t.fail(error)
  }
  finally {
    if (!found) {
      t.fail('Could not find content within test file')
    }

    t.pass()
  }
})