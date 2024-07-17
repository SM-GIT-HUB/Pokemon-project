import { Route, Routes } from "react-router-dom"
import PokemonDetails from "./components/PokemonDetails"
import Pokedex from "./components/Pokedex"

function CustomRoutes()
{
    return (
        <Routes>
            <Route path="" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
    )
}

export default CustomRoutes