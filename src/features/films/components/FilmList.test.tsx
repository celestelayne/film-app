import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FilmList from './FilmList'
import type { Film } from '../types'

const full: Film = {
  id: 'a',
  title: 'Alpha',
  year: 1999,
  runtimeMinutes: 100,
  genres: ['Drama', 'Comedy'],
  director: 'Dana Director',
  actors: ['Ann Actor', 'Ben Actor'],
  description: 'A full plot summary.',
}
const minimal: Film = { id: 'b', title: 'Beta' }

describe('FilmList', () => {
  it('renders every supplied film as a list item', () => {
    render(<FilmList films={[full, minimal]} />)
    const items = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Beta' })).toBeInTheDocument()
  })

  it('renders title and all available metadata', () => {
    render(<FilmList films={[full]} />)
    expect(screen.getByText('1999 · 100 min · Drama, Comedy')).toBeInTheDocument()
    expect(screen.getByText('Dana Director')).toBeInTheDocument()
    expect(screen.getByText('Ann Actor, Ben Actor')).toBeInTheDocument()
    expect(screen.getByText('A full plot summary.')).toBeInTheDocument()
  })

  it('omits missing optional metadata without placeholders', () => {
    render(<FilmList films={[minimal]} />)
    expect(screen.getByRole('listitem')).toHaveTextContent(/^Beta$/)
    expect(screen.queryByText('Director')).not.toBeInTheDocument()
    expect(screen.queryByText('Cast')).not.toBeInTheDocument()
  })

  it('omits only the field that is missing', () => {
    render(<FilmList films={[{ ...full, runtimeMinutes: undefined }]} />)
    expect(screen.getByText('1999 · Drama, Comedy')).toBeInTheDocument()
  })

  it('shows an empty state for an empty collection', () => {
    render(<FilmList films={[]} />)
    expect(screen.getByText('No films in your watchlist yet.')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('does not request film data over the network', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    render(<FilmList films={[full]} />)
    expect(fetchSpy).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
