import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { films } from './features/films/data/films'

describe('App', () => {
  it('renders every film from the local dataset synchronously', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(films.length)
  })
})
