import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { alphabetize } from '../../src/lib/alphabetize.js'

const fixture = ['z', 'a', 'c', 'b']
const expected = ['a', 'b', 'c', 'z']

describe('alphabetize', () => {
  it('order array in alphabetic order', () => {
    assert.deepEqual(alphabetize(fixture), expected)
  })

  it('do not mutate original array', () => {
    alphabetize(fixture)
    assert.deepEqual(fixture, ['z', 'a', 'c', 'b'])
  })
})
