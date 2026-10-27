import type { Film } from '../types'

type FilmListProps = {
  films: Film[]
}

function FilmList({ films }: FilmListProps) {
  if (films.length === 0) {
    return (
      <p className="rounded-card border border-border p-5 text-muted-fg">
        No films in your watchlist yet.
      </p>
    )
  }

  return (
    <ul role="list" className="flex flex-col gap-4">
      {films.map((film) => {
        const details = [
          film.year?.toString(),
          film.runtimeMinutes ? `${film.runtimeMinutes} min` : undefined,
          film.genres?.join(', '),
        ].filter(Boolean)

        return (
          <li key={film.id} className="rounded-card border border-border p-5 wrap-break-word">
            <h2 className="text-lg font-semibold">{film.title}</h2>
            {details.length > 0 && (
              <p className="mt-1 text-sm text-muted-fg">{details.join(' · ')}</p>
            )}
            {(film.director || film.actors) && (
              <dl className="mt-3 text-sm">
                {film.director && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium">Director</dt>
                    <dd className="text-muted-fg">{film.director}</dd>
                  </div>
                )}
                {film.actors && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium">Cast</dt>
                    <dd className="text-muted-fg">{film.actors.join(', ')}</dd>
                  </div>
                )}
              </dl>
            )}
            {film.description && <p className="mt-3">{film.description}</p>}
          </li>
        )
      })}
    </ul>
  )
}

export default FilmList
