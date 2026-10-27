import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { films } from './features/films/data/films'

describe('App', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('renders every film from the local dataset synchronously', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(films.length)
  })

  it('opens filtered when the URL has a search query', () => {
    window.history.replaceState(null, '', '/?q=parasite')
    render(<App />)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByRole('searchbox', { name: 'Search films' })).toHaveValue('parasite')
  })
})
