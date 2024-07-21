/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useRef } from "react"

function Search({ setSearchTerm })
{
    const timerId = useRef(null);

    function debounce(e)
    {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
            setSearchTerm(e.target.value.toLowerCase());
        }, 1500)
    }

    return (
        <div>
            <input className="w-[300px] md:w-[500px] border-[1px] border-black p-[10px] rounded-[4px] outline-none mb-[5px] mt-[10px]" type="text" placeholder="pokemon name"
            onChange={debounce}
            />
        </div>
    )
}

export default Search