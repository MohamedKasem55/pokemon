import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemons from './pages/Pokemons/Pokemons'
import PokemonDetails from './pages/PokemonDetails/PokemonDetails'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Spinner from './components/Spinner/Spinner'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pokemons />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
