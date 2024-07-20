/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon from "./Pokemon"
import usePokemonDetails from "../../hooks/usePokemonDetails";

function capi(str)
{
    if (str == null) {
        return;
    }

    return str[0].toUpperCase() + str.slice(1);
}

function PokemonDetails({ name })
{
    const {id} = useParams();

    const [myPokemon, similarPokemons, loading] = usePokemonDetails(id, name);

    // console.log(similarPokemons);


    return (
        <div className="flex items-center justify-around h-[90vh]">
            {
                loading? <div className="loader w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> :
                <>
                <div className="w-[50%] flex flex-col items-center justify-center font-bold mt-[30px] md:mt-[0px] mb-[20px]">
                    <h1 className="text-[40px] tracking-[5px] mb-[10px] text-[#00539c]">{capi(myPokemon.name)}</h1>
                    <img src={myPokemon.image} className="w-[350px] h-[400px] md:h-[380px] mb-[15px]" alt="" />
                    <h1>Height: {myPokemon.height}</h1>
                    <h1 className="m-[10px]">Weight: {myPokemon.weight}</h1>
                    <div className="flex gap-[5px]">{ myPokemon.type && myPokemon.type.map((name) => <h1 className="bg-[#04ff0075] p-[5px_10px] rounded-[4px]" key={name}> {capi(name)} </h1>)} </div>
                </div>

                <div className="w-[50%] flex flex-col items-center gap-[20px] md:gap-[30px]">
                    <h1 className="text-[20px] md:text-[30px] font-bold mt-[10px] text-[#217704ad]">
                        Similar Pokemons
                    </h1>
                    <div className="h-[510px] md:h-[500px] overflow-scroll grid grid-cols-2 md:grid-cols-3 gap-[10px] md:gap-[50px]">
                        {
                            similarPokemons.map((p, ind) => <Pokemon name={p.name} image={p.image} key={ind} id={p.id}/>)
                        }
                    </div>
                </div>
            </>
            }

        </div>

    )
}

export default PokemonDetails;