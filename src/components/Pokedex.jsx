import Search from "./Search"
import PokemonList from "./PokemonList"

function Pokedex()
{
    return (
        <div className="flex flex-col p-[10px] items-center gap-[10px]">
            <Search/>
            <PokemonList/>
        </div>
    )
}

export default Pokedex