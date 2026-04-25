import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemons from './pages/Pokemons'
import PokemonDetails from './pages/PokemonDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
