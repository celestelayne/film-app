import { describe, expect, it } from 'vitest'
import { filmsSchema, parseFilms } from '../types'

describe('filmsSchema', () => {
  it('accepts a film with only id and title', () => {
    expect(filmsSchema.safeParse([{ id: 'a', title: 'A' }]).success).toBe(true)
  })

  it('rejects a film without a title', () => {
    expect(filmsSchema.safeParse([{ id: 'a' }]).success).toBe(false)
  })

  it('rejects duplicate ids', () => {
    const result = filmsSchema.safeParse([
      { id: 'a', title: 'A' },
      { id: 'a', title: 'B' },
    ])
    expect(result.success).toBe(false)
  })

  it('names the duplicated id and its position in the error', () => {
    const result = filmsSchema.safeParse([
      { id: 'parasite', title: 'A' },
      { id: 'other', title: 'B' },
      { id: 'parasite', title: 'C' },
    ])
    expect(result.success).toBe(false)
    expect(result.error?.issues).toMatchObject([
      { message: 'Duplicate film id: "parasite"', path: [2, 'id'] },
    ])
  })

  it('rejects empty optional strings and arrays', () => {
    expect(filmsSchema.safeParse([{ id: 'a', title: 'A', director: '' }]).success).toBe(false)
    expect(filmsSchema.safeParse([{ id: 'a', title: 'A', actors: [] }]).success).toBe(false)
  })
})

describe('parseFilms', () => {
  it('returns the films when valid', () => {
    expect(parseFilms([{ id: 'a', title: 'A' }])).toEqual([{ id: 'a', title: 'A' }])
  })

  it('throws an error that names the field and position of an invalid entry', () => {
    expect(() => parseFilms([{ id: 'a', title: 'A' }, { id: 'b', title: '' }])).toThrow(
      /Invalid film data[\s\S]*\[1\]\.title/,
    )
  })

  it('throws an error that names a duplicated id', () => {
    expect(() =>
      parseFilms([
        { id: 'parasite', title: 'A' },
        { id: 'parasite', title: 'B' },
      ]),
    ).toThrow(/Duplicate film id: "parasite"[\s\S]*\[1\]\.id/)
  })
})
