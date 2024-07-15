/* eslint-disable react/prop-types */
function capi(str)
{
    return str[0].toUpperCase() + str.slice(1);
}

function Pokemon({ name, image })
{
    return (
        <div className="flex flex-col items-center">
            <div>{capi(name)}</div>
            <div className="w-[80px] md:w-[150px]">
                <img src={image} />
            </div>
        </div>
    )
}

export default Pokemon;