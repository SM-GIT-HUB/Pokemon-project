/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function capi(str)
{
    if (str == null) {
        return;
    }

    return str[0].toUpperCase() + str.slice(1);
}

function PokemonDetails()
{
    const {id} = useParams();
    const [myPokemon, setMyPokemon] = useState({});

    async function downloadPokemon()
    {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        // console.log(response.data.types);
        setMyPokemon({
            name: response.data.name,
            height : response.data.height,
            weight : response.data.weight,
            image : response.data.sprites.other.dream_world.front_default,
            type : response.data.types.map((t) => t.type.name),
        })
    }

    useEffect(() => {downloadPokemon()}, []);

    return (
        <div className="flex flex-col items-center justify-center font-bold mt-[30px] md:mt-[0px]">
            <h1 className="text-[40px] tracking-[5px] mb-[10px] text-[#00539c]">{capi(myPokemon.name)}</h1>
            <img src={myPokemon.image} className="w-[350px] h-[400px] md:h-[380px] mb-[15px]" alt="" />
            <h1>Height: {myPokemon.height}</h1>
            <h1 className="m-[10px]">Weight: {myPokemon.weight}</h1>
            <div className="flex gap-[5px]">{ myPokemon.type && myPokemon.type.map((name) => <h1 className="bg-[#04ff0075] p-[5px_10px] rounded-[4px]" key={name}> {capi(name)} </h1>)} </div>
        </div>
    )
}

export default PokemonDetails;