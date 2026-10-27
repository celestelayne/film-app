import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import FilmBrowser from './FilmBrowser'
import type { Film } from '../types'

const films: readonly Film[] = Object.freeze([
  { id: 'a', title: 'Amélie' },
  { id: 'b', title: 'Mad Max' },
  { id: 'c', title: 'Madame Web' },
])

const field = () => screen.getByRole('searchbox', { name: 'Search films' })
const titles = () => screen.queryAllByRole('heading', { level: 2 }).map((h) => h.textContent)
const type = (value: string) => fireEvent.change(field(), { target: { value } })

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('FilmBrowser search', () => {
  it('shows every film, an empty field and the full count with no query', () => {
    render(<FilmBrowser films={films} />)
    expect(field()).toHaveValue('')
    expect(titles()).toEqual(['Amélie', 'Mad Max', 'Madame Web'])
    expect(screen.getByRole('status')).toHaveTextContent('3 films')
  })

  it('narrows the list while typing, ignoring case, in dataset order', () => {
    render(<FilmBrowser films={films} />)
    type('MAD')
    expect(titles()).toEqual(['Mad Max', 'Madame Web'])
    expect(screen.getByRole('status')).toHaveTextContent('2 films')
  })

  it('ignores accents', () => {
    render(<FilmBrowser films={films} />)
    type('amelie')
    expect(titles()).toEqual(['Amélie'])
    expect(screen.getByRole('status')).toHaveTextContent(/^1 film$/)
  })

  it('writes q to the URL while typing and removes it when cleared', () => {
    render(<FilmBrowser films={films} />)
    type('mad')
    expect(window.location.search).toBe('?q=mad')
    type('')
    expect(window.location.search).toBe('')
    expect(titles()).toHaveLength(3)
  })

  it('opens pre-filled and filtered from a URL with q', () => {
    window.history.replaceState(null, '', '/?q=max')
    render(<FilmBrowser films={films} />)
    expect(field()).toHaveValue('max')
    expect(titles()).toEqual(['Mad Max'])
  })

  it('preserves unrelated URL parameters', () => {
    window.history.replaceState(null, '', '/?genre=drama')
    render(<FilmBrowser films={films} />)
    type('mad')
    expect(window.location.search).toBe('?genre=drama&q=mad')
  })

  it('follows the URL on back/forward navigation', () => {
    render(<FilmBrowser films={films} />)
    window.history.replaceState(null, '', '/?q=amelie')
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(field()).toHaveValue('amelie')
    expect(titles()).toEqual(['Amélie'])
  })

  it('shows a no-results state with the query and a zero count', () => {
    render(<FilmBrowser films={films} />)
    type('xyz')
    expect(screen.getByText('No films match "xyz".')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('0 films')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.queryByText('No films in your watchlist yet.')).not.toBeInTheDocument()
  })

  it('clears the search from the no-results state and returns focus to the field', () => {
    render(<FilmBrowser films={films} />)
    type('xyz')
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(field()).toHaveValue('')
    expect(field()).toHaveFocus()
    expect(titles()).toHaveLength(3)
    expect(window.location.search).toBe('')
  })

  it('treats an empty or whitespace-only q as no query', () => {
    window.history.replaceState(null, '', '/?q=%20%20')
    render(<FilmBrowser films={films} />)
    expect(titles()).toHaveLength(3)
  })

  it('uses the first value of a repeated q', () => {
    window.history.replaceState(null, '', '/?q=amelie&q=max')
    render(<FilmBrowser films={films} />)
    expect(titles()).toEqual(['Amélie'])
  })

  it('truncates an over-long q', () => {
    window.history.replaceState(null, '', `/?q=${'a'.repeat(150)}`)
    render(<FilmBrowser films={films} />)
    expect(field()).toHaveValue('a'.repeat(100))
  })

  it('does not crash on special characters or malformed encoding', () => {
    window.history.replaceState(null, '', '/?q=.*')
    expect(() => render(<FilmBrowser films={films} />)).not.toThrow()
    expect(screen.getByText('No films match ".*".')).toBeInTheDocument()
  })

  it('hides the search controls and shows the empty message for an empty dataset', () => {
    render(<FilmBrowser films={[]} />)
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByText('No films in your watchlist yet.')).toBeInTheDocument()
  })
})
