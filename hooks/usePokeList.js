import { useEffect, useState } from "react"
import axios from "axios"

function usePokeList()
{
    const [pokeObj, setPokeObj] = useState({
        pokemonList : [],
        isLoading : true,
        url : 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl : "",
        prevUrl : ""
    })

    async function downloadPokemons()
    {
        setPokeObj((state) => ({...state, isLoading : true}));
        const response = await axios.get(pokeObj.url);

        setPokeObj((state) => ({...state, nextUrl : response.data.next, prevUrl : response.data.previous}));

        const pokemonResults = response.data.results;

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemondatas = await axios.all(pokemonPromise);

        let myResult = pokemondatas.map((pokeData) => {
            const pokemon = pokeData.data;

            return {name : pokemon.name,
                id : pokemon.id,
                image : pokemon.sprites.other.dream_world.front_default != null? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.home.front_default,
                types : pokemon.types,
            }
        });

        setPokeObj((state) => ({...state, pokemonList : [...myResult], isLoading : false}));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokeObj.url])

    return [pokeObj, setPokeObj];
}

export default usePokeList