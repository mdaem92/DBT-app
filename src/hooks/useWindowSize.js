import {useState,useLayoutEffect} from 'react'
const useWindowSize = ()=>{

    const [width,setWidth] = useState(window.innerWidth)

    useLayoutEffect(() => {
        const updateWidth = ()=>{
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize',updateWidth)
        updateWidth()
        return () => {
            window.removeEventListener('resize',updateWidth)
        };
    }, [])
    return width
}
export default useWindowSize