/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function usePokemonDetails(id, name = '') {
    const [myPokemon, setMyPokemon] = useState({type: null});
    const [similarPokemons, setSimilarPokemons] = useState({});
    const [loading, setLoading] = useState(true);
    // console.log("name is", name);

    const downloadPokemon = useCallback(async () => {
        setLoading(true);
        let url = name === '' ? `https://pokeapi.co/api/v2/pokemon/${id}` : `https://pokeapi.co/api/v2/pokemon/${name}`;

        try {
            const response = await axios.get(url);

            // console.log(response.data.types);
            setMyPokemon({
                name: response.data.name,
                height: response.data.height,
                weight: response.data.weight,
                image: response.data.sprites.other.dream_world.front_default != null ? response.data.sprites.other.dream_world.front_default : response.data.sprites.other.home.front_default,
                type: response.data.types.map((t) => t.type.name),
            });
        } catch {
            console.log("Not found");
        }
    }, [id, name]);

    const getSimilars = useCallback(async () => {
        setLoading(true);

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

        for (let x of responses) {
            allPokemons = [...allPokemons, ...x];
        }

        // console.log(allPokemons);

        allPokemons = allPokemons.filter(poke => poke.name !== myPokemon.name);

        allPokemons = Array.from(
            new Map(allPokemons.map(p => [p.name, p])).values()
        );

        // console.log(allPokemons);

        const pokemonPromise = allPokemons.map((pokemon) => axios.get(pokemon.url));
        const pokemondatas = await axios.all(pokemonPromise);

        let myResult = pokemondatas.map((pokeData) => {
            const pokemon = pokeData.data;

            return {
                name: pokemon.name,
                id: pokemon.id,
                image: pokemon.sprites.other.dream_world.front_default != null ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.home.front_default,
                types: pokemon.types,
            };
        });

        setSimilarPokemons(myResult);

        setLoading(false);
    }, [myPokemon]);

    useEffect(() => { downloadPokemon() }, [downloadPokemon]);
    useEffect(() => { getSimilars() }, [myPokemon, getSimilars]);

    return [myPokemon, similarPokemons, loading];
}

export default usePokemonDetails;
