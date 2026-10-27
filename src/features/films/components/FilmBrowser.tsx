import { useRef } from 'react'
import { useFilmSearch } from '../search-query'
import type { Film } from '../types'
import FilmList from './FilmList'
import SearchField from './SearchField'
import { NoResults, ResultCount } from './SearchStatus'

type FilmBrowserProps = {
  films: readonly Film[]
}

function FilmBrowser({ films }: FilmBrowserProps) {
  const { query, setQuery, visibleFilms } = useFilmSearch(films)
  const searchRef = useRef<HTMLInputElement>(null)

  if (films.length === 0) {
    return <FilmList films={[]} />
  }

  const clearSearch = () => {
    setQuery('')
    searchRef.current?.focus()
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchField ref={searchRef} value={query} onChange={setQuery} />
      <ResultCount count={visibleFilms.length} />
      {visibleFilms.length === 0 ? (
        <NoResults query={query.trim()} onClear={clearSearch} />
      ) : (
        <FilmList films={visibleFilms} />
      )}
    </div>
  )
}

export default FilmBrowser
