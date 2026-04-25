import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import PokemonDetails from './pages/PokemonDetails'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
