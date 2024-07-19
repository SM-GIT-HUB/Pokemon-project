/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import axios from "axios"
import Pokemon from "./Pokemon";
import usePokeList from "../../hooks/usePokeList";

function PokemonList()
{
    const [pokeObj, setPokeObj] = usePokeList();

    const buttonClass = (isDisabled) => `rounded-[5px] p-[5px_0px] w-[75px] ${isDisabled? "bg-[#d4d4d4]" : "bg-[#f94f71] hover:bg-[crimson]"} duration-[0.1s] text-white font-bold`;

    return (
        <div className="m-[10px_auto] flex gap-[10px] flex-wrap flex-col items-center justify-center">
            <div className="font-bold">Pokemon list</div>
            <div className="flex justify-between w-[300px] md:w-[500px] items-center mt-[15px] mb-[15px]">
                <button disabled={pokeObj.prevUrl == null} className={buttonClass(pokeObj.prevUrl == null)} onClick={() => setPokeObj({...pokeObj, url : pokeObj.prevUrl})} >Prev</button>
                <button disabled={pokeObj.nextUrl == null} className={buttonClass(pokeObj.nextUrl == null)} onClick={() => setPokeObj({...pokeObj, url : pokeObj.nextUrl})}>Next</button>
            </div>
            <div className={`grid ${pokeObj.isLoading? "grid-cols-1" : "grid-cols-4"} ${pokeObj.isLoading? "md:grid-cols-1" : "md:grid-cols-5"} gap-[10px] md:gap-[100px]`}>
            {/* <div className={`grid grid-cols-${isLoading? "1" : "4"} md:grid-cols-${isLoading? "1" : "5"} gap-[10px] md:gap-[30px] lg:gap-[60px]`}> */}
            {
                pokeObj.isLoading? <div className="loader w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mt-[20px]"></div> :
                pokeObj.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
            }
            </div>
            <div className="flex justify-between w-[300px] md:w-[500px] items-center mt-[15px]">
                {
                    pokeObj.isLoading? "" : <>
                        <button disabled={pokeObj.prevUrl == null} className={buttonClass(pokeObj.prevUrl == null)} onClick={() => setPokeObj({...pokeObj, url : pokeObj.prevUrl})} >Prev</button>
                        <button disabled={pokeObj.nextUrl == null} className={buttonClass(pokeObj.nextUrl == null)} onClick={() => setPokeObj({...pokeObj, url : pokeObj.nextUrl})}>Next</button>
                    </>
                }
            </div>
        </div>
    )
}

export default PokemonList;