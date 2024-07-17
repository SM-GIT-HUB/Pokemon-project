import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function capi(str)
{
    return str[0].toUpperCase() + str.slice(1);
}

function Pokemon({ name, image, id })
{
    return (
        <Link to={`/pokemon/${id}`}>
            <div className="flex flex-col items-center hover:bg-[#5252d320] duration-[0.2s] cursor-pointer rounded-[4px]">
                <div>{capi(name)}</div>
                <div className="w-[80px] md:w-[150px]">
                    <img src={image} />
                </div>
            </div>
        </Link>
    )
}

export default Pokemon;