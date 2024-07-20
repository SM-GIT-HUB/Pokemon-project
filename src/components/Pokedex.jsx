/* eslint-disable no-unused-vars */
import Search from "./Search"
import PokemonList from "./PokemonList"
import { useState } from "react"
import PokemonDetails from "./PokemonDetails";

function Pokedex()
{
    const [searchTerm, setSearchTerm] = useState('');
    // console.log(searchTerm);

    return (
        <>
            <div className="w-full flex justify-center">
                <Search setSearchTerm={setSearchTerm}/>
            </div>
            {
                searchTerm? <PokemonDetails key={searchTerm} name={searchTerm}/> : 
                <div className="flex flex-col p-[10px] items-center gap-[10px]">
                    <PokemonList/>
                </div>
            }
            
        </>
    )
}

export default Pokedex