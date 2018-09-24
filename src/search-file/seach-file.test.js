import test from 'ava'
import searchFile from './search-file'

test('Able to read .docx format', async t => {
  const file = 'test_source/the-great-sea.docx'
  const searchTerms = ['then', 'this']
  let found = null
  try {
    found = await searchFile({file, searchTerms})
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