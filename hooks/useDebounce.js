/* eslint-disable no-unused-vars */
function useDebounce(cb)
{
    let timerId;

    return (...args) => { 
        // console.log(...args);
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            cb(...args);
        }, 1500);
    }
}

export default useDebounce