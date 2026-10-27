import { describe, expect, it } from 'vitest'
import { matchesTitle } from './view-rules'
import type { Film } from './types'

const film = (title: string): Film => ({ id: title, title })

describe('matchesTitle', () => {
  it('matches a substring of the title', () => {
    expect(matchesTitle(film('Mad Max: Fury Road'), 'fury')).toBe(true)
    expect(matchesTitle(film('Mad Max: Fury Road'), 'xyz')).toBe(false)
  })

  it('ignores letter case in both title and query', () => {
    expect(matchesTitle(film('Parasite'), 'PARA')).toBe(true)
    expect(matchesTitle(film('PARASITE'), 'para')).toBe(true)
  })

  it('ignores accents in both title and query', () => {
    expect(matchesTitle(film('Amélie'), 'amelie')).toBe(true)
    expect(matchesTitle(film('Amelie'), 'AMÉLIE')).toBe(true)
  })

  it('ignores leading and trailing whitespace in the query', () => {
    expect(matchesTitle(film('Parasite'), '  para  ')).toBe(true)
  })

  it('matches every film for an empty or whitespace-only query', () => {
    expect(matchesTitle(film('Parasite'), '')).toBe(true)
    expect(matchesTitle(film('Parasite'), '   ')).toBe(true)
  })

  it('treats regex characters as plain text', () => {
    expect(matchesTitle(film('Parasite'), '.*')).toBe(false)
    expect(matchesTitle(film('Mad Max (2015)'), '(')).toBe(true)
    expect(() => matchesTitle(film('Parasite'), '[')).not.toThrow()
  })

  it('does not mutate the film', () => {
    const frozen = Object.freeze(film('Parasite'))
    expect(() => matchesTitle(frozen, 'para')).not.toThrow()
  })
})
