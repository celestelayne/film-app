import { useId, type Ref } from 'react'

type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
  ref?: Ref<HTMLInputElement>
}

function SearchField({ value, onChange, ref }: SearchFieldProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        Search films
      </label>
      <input
        ref={ref}
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-control border border-muted-fg bg-bg px-3 text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
    </div>
  )
}

export default SearchField
