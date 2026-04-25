import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import Pokemons from './pages/Pokemons'
import PokemonDetails from './pages/PokemonDetails'
import ErrorBoundary from './components/ErrorBoundary'
import Spinner from './components/Spinner'

function PokemonDetailsWrapper() {
  const { id } = useParams()
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary key={id} onReset={reset}>
          <Suspense fallback={<Spinner />}>
            <PokemonDetails />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsWrapper />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
