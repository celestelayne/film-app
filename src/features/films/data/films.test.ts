import { describe, expect, it } from 'vitest'
import { films } from './films'
import { filmsSchema } from '../types'

describe('films data', () => {
  it('loads the validated starter dataset', () => {
    expect(films).toHaveLength(8)
  })

  it('has three films each missing a different optional field', () => {
    const missing = films.flatMap((film) =>
      (['year', 'runtimeMinutes', 'genres', 'director', 'actors', 'description'] as const).filter(
        (key) => film[key] === undefined,
      ),
    )
    expect(missing).toHaveLength(3)
    expect(new Set(missing).size).toBe(3)
  })
})

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

  it('rejects empty optional strings and arrays', () => {
    expect(filmsSchema.safeParse([{ id: 'a', title: 'A', director: '' }]).success).toBe(false)
    expect(filmsSchema.safeParse([{ id: 'a', title: 'A', actors: [] }]).success).toBe(false)
  })
})
