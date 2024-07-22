import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { formatTitle } from '../../src/lib/format-title.js'

describe('formatTitle', () => {
  it('should return the formatted title', () => {
    assert.deepEqual(formatTitle('Quake'), '\n===| Quake |===\n')
  })
})
