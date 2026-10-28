import { describe, expect, it } from 'vitest'
import { buildSearchString, parseSearchQuery } from './search-query'

describe('parseSearchQuery', () => {
  it('returns an empty string when q is absent or empty', () => {
    expect(parseSearchQuery('')).toBe('')
    expect(parseSearchQuery('?genre=drama')).toBe('')
    expect(parseSearchQuery('?q=')).toBe('')
  })

  it('returns the q value', () => {
    expect(parseSearchQuery('?q=mad')).toBe('mad')
    expect(parseSearchQuery('?q=mad+max')).toBe('mad max')
  })

  it('uses the first value when q is repeated', () => {
    expect(parseSearchQuery('?q=a&q=b')).toBe('a')
  })

  it('truncates values longer than 100 characters', () => {
    expect(parseSearchQuery(`?q=${'a'.repeat(150)}`)).toHaveLength(100)
  })

  it('does not throw on malformed percent-encoding or special characters', () => {
    expect(() => parseSearchQuery('?q=%E0%A4%A')).not.toThrow()
    expect(parseSearchQuery('?q=.*')).toBe('.*')
    expect(parseSearchQuery('?q=(')).toBe('(')
  })
})

describe('buildSearchString', () => {
  it('sets q', () => {
    expect(buildSearchString('', 'mad')).toBe('?q=mad')
  })

  it('removes q when the query is empty', () => {
    expect(buildSearchString('?q=mad', '')).toBe('')
  })

  it('preserves unrelated parameters', () => {
    expect(buildSearchString('?genre=drama', 'mad')).toBe('?genre=drama&q=mad')
    expect(buildSearchString('?genre=drama&q=mad', '')).toBe('?genre=drama')
  })

  it('replaces repeated q values with one', () => {
    expect(buildSearchString('?q=a&q=b', 'c')).toBe('?q=c')
  })

  it('truncates values longer than 100 characters', () => {
    expect(parseSearchQuery(buildSearchString('', 'a'.repeat(150)))).toHaveLength(100)
  })
})
