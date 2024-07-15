/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import axios from "axios"
import Pokemon from "./Pokemon";

function PokemonList()
{
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

    async function getNext()
    {
        const response = await axios.get(url);
        console.log(response);

        const nextUrl = response.data.next;

        // console.log(nextUrl);

        if (nextUrl == null) {
            return;
        }
        
        setUrl(nextUrl);
    }

    async function downloadPokemons()
    {
        setIsLoading(true);
        const response = await axios.get(url);
        
        const pokemonResults = response.data.results;

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemondatas = await axios.all(pokemonPromise);

        let myResult = pokemondatas.map((pokeData) => {
            const pokemon = pokeData.data;

            return {name : pokemon.name,
                id : pokemon.id,
                image : pokemon.sprites.other.dream_world.front_default,
                types : pokemon.types,
            }
        });

        // console.log(myResult);
        // console.log(response.data);

        setPokemonList(myResult);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [url])

    return (
        <div className="m-[10px_auto] flex gap-[10px] flex-wrap flex-col items-center justify-center">
            <div>Pokemon list</div>
            <div className={`grid grid-cols-${isLoading? 1 : 4} md:grid-cols-${isLoading? 1 : 5} gap-[10px] md:gap-[30px] lg:gap-[60px]`}>
            {
                isLoading? <div className="font-bold">Loading...</div> :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
            </div>
            <div>
                <button>Prev</button>
                <button className="p-[10px] border-[1px] border-black" onClick={() => getNext()}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;