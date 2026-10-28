import FilmBrowser from './features/films/components/FilmBrowser'
import { films } from './features/films/data/films'

function App() {
  return (
    <main className="min-h-screen bg-bg text-fg font-sans">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">Watchlist</h1>
        <FilmBrowser films={films} />
      </div>
    </main>
  )
}

export default App
