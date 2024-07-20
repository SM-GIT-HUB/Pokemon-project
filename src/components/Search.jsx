/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import useDebounce from "../../hooks/useDebounce"

function Search({ setSearchTerm })
{
    const debouncedCallback = useDebounce((e) => setSearchTerm(e.target.value.toLowerCase()));

    return (
        <div>
            <input className="w-[300px] md:w-[500px] border-[1px] border-black p-[10px] rounded-[4px] outline-none mb-[5px] mt-[10px]" type="text" placeholder="pokemon name"
            onChange={debouncedCallback}
            />
        </div>
    )
}

export default Search