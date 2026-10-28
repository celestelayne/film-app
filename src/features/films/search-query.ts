import { useCallback, useEffect, useRef, useState } from 'react'
import type { Film } from './types'
import { matchesTitle } from './view-rules'

const MAX_QUERY_LENGTH = 100
const URL_WRITE_DELAY_MS = 250

const clamp = (query: string) => [...query].slice(0, MAX_QUERY_LENGTH).join('')

export function parseSearchQuery(search: string): string {
  return clamp(new URLSearchParams(search).get('q') ?? '')
}

export function buildSearchString(search: string, query: string): string {
  const params = new URLSearchParams(search)
  const value = clamp(query)
  if (value === '') {
    params.delete('q')
  } else {
    params.set('q', value)
  }
  const next = params.toString()
  return next ? `?${next}` : ''
}

function writeQueryToUrl(query: string) {
  const { pathname, search, hash } = window.location
  try {
    window.history.replaceState(
      window.history.state,
      '',
      `${pathname}${buildSearchString(search, query)}${hash}`,
    )
  } catch {
    // The URL is a best-effort mirror of the field: browsers can refuse or throttle
    // history updates, and typing must keep working from local state when they do.
  }
}

export function useFilmSearch(films: readonly Film[]) {
  const [query, setDraft] = useState(() => parseSearchQuery(window.location.search))
  const timer = useRef<number | undefined>(undefined)
  const latest = useRef(query)

  const cancelPendingWrite = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = undefined
  }, [])

  const setQuery = useCallback(
    (next: string) => {
      const value = clamp(next)
      latest.current = value
      setDraft(value)
      cancelPendingWrite()
      timer.current = window.setTimeout(() => {
        timer.current = undefined
        writeQueryToUrl(value)
      }, URL_WRITE_DELAY_MS)
    },
    [cancelPendingWrite],
  )

  useEffect(() => {
    const syncFromUrl = () => {
      cancelPendingWrite()
      const fromUrl = parseSearchQuery(window.location.search)
      latest.current = fromUrl
      setDraft(fromUrl)
    }
    window.addEventListener('popstate', syncFromUrl)
    return () => {
      window.removeEventListener('popstate', syncFromUrl)
      if (timer.current !== undefined) {
        cancelPendingWrite()
        writeQueryToUrl(latest.current)
      }
    }
  }, [cancelPendingWrite])

  const visibleFilms = films.filter((film) => matchesTitle(film, query))

  return { query, setQuery, visibleFilms }
}
