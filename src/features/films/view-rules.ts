import type { Film } from './types'

const fold = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export function matchesTitle(film: Film, query: string): boolean {
  const needle = fold(query.trim())
  return needle === '' || fold(film.title).includes(needle)
}
