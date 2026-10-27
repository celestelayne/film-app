import { describe, expect, it } from 'vitest'
import { filmsSchema } from '../types'

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
