import { useCallback, useSyncExternalStore } from 'react'
import type { Film } from './types'
import { matchesTitle } from './view-rules'

const MAX_QUERY_LENGTH = 100

export function parseSearchQuery(search: string): string {
  const raw = new URLSearchParams(search).get('q') ?? ''
  return [...raw].slice(0, MAX_QUERY_LENGTH).join('')
}

export function buildSearchString(search: string, query: string): string {
  const params = new URLSearchParams(search)
  const value = [...query].slice(0, MAX_QUERY_LENGTH).join('')
  if (value === '') {
    params.delete('q')
  } else {
    params.set('q', value)
  }
  const next = params.toString()
  return next ? `?${next}` : ''
}

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

const getSearch = () => window.location.search

export function useFilmSearch(films: readonly Film[]) {
  const search = useSyncExternalStore(subscribe, getSearch)
  const query = parseSearchQuery(search)

  const setQuery = useCallback((next: string) => {
    const { pathname, search: current, hash } = window.location
    window.history.replaceState(null, '', `${pathname}${buildSearchString(current, next)}${hash}`)
    listeners.forEach((listener) => listener())
  }, [])

  const visibleFilms = films.filter((film) => matchesTitle(film, query))

  return { query, setQuery, visibleFilms }
}
