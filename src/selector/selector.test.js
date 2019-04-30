import test from 'ava'

import selector from './selector'

test('Selector should return true', (t) => {
  const text = 'This is content where it should return true'
  const searchTerms = ['not', 'where']

  const found = selector({ searchTerms, text })

  t.true(found)
})
