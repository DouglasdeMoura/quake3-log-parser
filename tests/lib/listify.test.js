import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { listify } from '../../src/lib/listify.js'

const fixture = ['a', 'b', 'c', 'd']

describe('listify', () => {
  it('should return the formatted title', () => {
    assert.deepEqual(listify(fixture), 'a, b, c, and d')
  })
})
