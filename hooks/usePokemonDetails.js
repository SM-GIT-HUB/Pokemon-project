/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id)
{
    const [myPokemon, setMyPokemon] = useState({type : null});
    const [similarPokemons, setSimilarPokemons] = useState({});
    const [loading, setLoading] = useState(true);

    async function downloadPokemon()
    {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        // console.log(response.data.types);
        setMyPokemon({
            name: response.data.name,
            height : response.data.height,
            weight : response.data.weight,
            image : response.data.sprites.other.dream_world.front_default != null? response.data.sprites.other.dream_world.front_default : response.data.sprites.other.home.front_default,
            type : response.data.types.map((t) => t.type.name),
        })
    }

    async function getSimilars()
    {
        setLoading(state => true);

        if (myPokemon.type == null) {
            return; 
        } 

        const responses = await Promise.all(
            myPokemon.type.map(async (t) => {
                const res = await axios.get(`https://pokeapi.co/api/v2/type/${t}`);
                const pokes = res.data.pokemon.map((p) => p.pokemon);
                let index = Math.floor(Math.random() * 50);
                return pokes.slice(index, index + 20);
            })
        );

        let allPokemons = [];
        
        for(let x of responses)
        {
            allPokemons = [...allPokemons, ...x];
        }

        // console.log(allPokemons);
        
        allPokemons = allPokemons.filter(poke => poke.name !== myPokemon.name);

        allPokemons = Array.from(
            new Map(allPokemons.map(p=> [p.name, p])).values()
        )
        
        // console.log(allPokemons);

        const pokemonPromise = allPokemons.map((pokemon) => axios.get(pokemon.url));
        const pokemondatas = await axios.all(pokemonPromise);

        let myResult = pokemondatas.map((pokeData) => {
            const pokemon = pokeData.data;

            return {name : pokemon.name,
                id : pokemon.id,
                image : pokemon.sprites.other.dream_world.front_default != null? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.home.front_default,
                types : pokemon.types,
            }
        });
        
        setSimilarPokemons(myResult);

        setLoading(state => false);
    }

    useEffect(() => {downloadPokemon()}, [id]);
    useEffect(() => {getSimilars()}, [myPokemon]);

    return [myPokemon, similarPokemons, loading];
}

export default usePokemonDetails