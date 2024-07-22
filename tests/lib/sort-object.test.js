import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { sortObject } from '../../src/lib/sort-object.js'

const fixture = {
  a: 0,
  b: 10,
  c: 5,
}

describe('sortObject', () => {
  it('should order the object', () => {
    assert.deepEqual(sortObject(fixture), {
      b: 10,
      c: 5,
      a: 0,
    })
  })

  it('should not mutate the original object', () => {
    sortObject(fixture)
    assert.deepEqual(fixture, {
      a: 0,
      b: 10,
      c: 5,
    })
  })
})
