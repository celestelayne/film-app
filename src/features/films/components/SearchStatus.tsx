type ResultCountProps = {
  count: number
}

export function ResultCount({ count }: ResultCountProps) {
  return (
    <p role="status" className="text-sm text-muted-fg">
      {count === 1 ? '1 film' : `${count} films`}
    </p>
  )
}

type NoResultsProps = {
  query: string
  onClear: () => void
}

export function NoResults({ query, onClear }: NoResultsProps) {
  return (
    <div className="rounded-card border border-border p-5 wrap-break-word">
      <p>{`No films match "${query}".`}</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 min-h-11 min-w-11 rounded-control border border-muted-fg px-4 py-2 font-medium hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Clear search
      </button>
    </div>
  )
}
