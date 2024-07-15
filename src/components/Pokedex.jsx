import Search from "./Search"
import PokemonList from "./PokemonList"

function Pokedex()
{
    return (
        <div className="flex flex-col p-[10px] items-center gap-[10px]">
            <h1 className="font-bold text-[25px] tracking-[8px]">Pokedex</h1>
            <Search/>
            <PokemonList/>
        </div>
    )
}

export default Pokedex