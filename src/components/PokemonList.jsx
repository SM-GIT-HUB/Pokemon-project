/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import axios from "axios"
import Pokemon from "./Pokemon";

function PokemonList()
{
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const[nextUrl, setNextUrl] = useState("");
    const[prevUrl, setPrevUrl] = useState("");

    async function downloadPokemons()
    {
        setIsLoading(true);
        const response = await axios.get(url);

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // console.log(prevUrl);
        // console.log(nextUrl);
        
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

        // setPokemonList(myResult);
        setPokemonList([...myResult]);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [url])

    const buttonClass = (isDisabled) => `rounded-[5px] p-[5px_0px] w-[75px] ${isDisabled? "bg-[#d4d4d4]" : "bg-[#f94f71] hover:bg-[crimson]"} duration-[0.1s] text-white font-bold`;

    return (
        <div className="m-[10px_auto] flex gap-[10px] flex-wrap flex-col items-center justify-center">
            <div>Pokemon list</div>
            <div className={`grid ${isLoading? "grid-cols-1" : "grid-cols-4"} ${isLoading? "md:grid-cols-1" : "md:grid-cols-5"} gap-[10px] md:gap-[100px]`}>
            {/* <div className={`grid grid-cols-${isLoading? "1" : "4"} md:grid-cols-${isLoading? "1" : "5"} gap-[10px] md:gap-[30px] lg:gap-[60px]`}> */}
            {
                isLoading? <div className="font-bold">Loading...</div> :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
            </div>
            <div className="flex justify-between w-[300px] md:w-[500px] items-center mt-[15px]">
                <button disabled={prevUrl == null} className={buttonClass(prevUrl == null)} onClick={() => setUrl(prevUrl)} >Prev</button>
                <button disabled={nextUrl == null} className={buttonClass(nextUrl == null)} onClick={() => setUrl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList;